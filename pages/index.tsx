import { useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"

import { Box, Typography, Button, Divider, Paper } from "@mui/material"
import { DataGrid, GridColDef, GridValidRowModel, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid"
import { Add, Edit, CopyAll, Refresh } from "@mui/icons-material"

import auth, { User, UserDetail } from "@/lib/services/auth"
import { fetchLinkConfigs, LinkConfig } from "@/lib/services/linkConfig"
import EditModal from "@/lib/components/LinkConfig/EditModal"
import { useEventBus } from "@/lib/components/BusProvider/BusProvider"

interface HomeProps {
  user: User | null
  userId: string
  linkConfigs: LinkConfig[] | null
  userDetails: UserDetail | null
}

export default function Home({
  user,
  userId,
  userDetails,
  linkConfigs,
}: HomeProps): JSX.Element {
  const [data, setData] = useState(linkConfigs || [])
  const [selectedConfig, setSelectedConfig] = useState<any | null>(null)
  const bus = useEventBus()

  const handleCopy = (docId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.host}/link/${userId}/${docId}`
      )
      bus.emit("show-notification", { content: "Copied Link" })
    }
  }

  const handleRefresh = async () => {
    const res = await fetch("/api/linkConfigs")
    if (res && res.ok) {
      const result = await res.json()
      setData(result)
    }
  }

  const handleModalClose = () => {
    handleRefresh()
    setSelectedConfig(null)
  }

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      type: "string",
      headerName: "Name",
      flex: 0.3,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params: any) => [
        <GridActionsCellItem
          key="edit"
          onClick={() => setSelectedConfig(params.row)}
          icon={<Edit />}
          label="Edit"
          color="primary"
        />,
        <GridActionsCellItem
          key="copy"
          onClick={() => handleCopy(params.id)}
          icon={<CopyAll />}
          label="Copy Link"
          color="primary"
        />,
      ],
    },
  ]

  const toolbar = () => (
    <GridToolbarContainer>
      <Box px={1} py={2} width="100%" style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" component="h2">
          Link Configurations
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Button
            onClick={() => setSelectedConfig({})}
            title="Create New Link Configuration"
            startIcon={<Add />}
          >
            Add New
          </Button>
          <Button onClick={() => handleRefresh()} startIcon={<Refresh />}>
            Refresh
          </Button>
        </Box>
      </Box>
    </GridToolbarContainer>
  )

  if (!user) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>Linx Flow</title>
      </Head>
      <main>
        <>
          <Box m={8}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4" component="h1">
                {userDetails?.name || user?.email
                  ? `Welcome ${userDetails?.name || user?.email || ""}!`
                  : "Welcome!"}
              </Typography>
            </Box>
            <br />
            <Divider />
            {data && (
              <Box my={8} sx={{ flexGrow: 1 }}>
                <Paper>
                  <DataGrid
                    aria-label="link config table"
                    autoHeight
                    pagination
                    slots={{
                      toolbar: toolbar
                    }}
                    sx={{ borderRadius: "16px" }}
                    columns={columns}
                    rows={data || []}
                    rowCount={(data && data.length) || 0}
                    disableRowSelectionOnClick
                    disableColumnSelector
                    disableDensitySelector
                  />
                </Paper>
                {selectedConfig && (
                  <EditModal
                    open={!!selectedConfig}
                    onClose={handleModalClose}
                    config={selectedConfig}
                  />
                )}
              </Box>
            )}
          </Box>
        </>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const user = await auth.getUserWithContext(ctx)
  if (user) {
    const data = (await fetchLinkConfigs({ userId: user.id || "", limit: 25 })) || []
    const userDetails = await auth.fetchUserDetails(user.id || "")

    return { props: { user, userDetails, userId: user.id || "", linkConfigs: data } }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/auth/signin",
    },
  }
}
