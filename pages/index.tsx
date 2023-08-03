import { useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import NLink from "next/link"

import { Box, Link, Typography, Button, Divider, Paper } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { Add, Edit, CopyAll } from "@mui/icons-material"

import auth, { User, UserDetail } from "@/lib/services/auth"
import { fetchLinkConfigs, LinkConfig } from "@/lib/services/linkConfig"
// import { NewFormModal } from '@/lib/components/NewFormModal'
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
  const renderUser = () => (
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
      {linkConfigs && <DataTable userId={userId} data={linkConfigs} />}
    </Box>
  )

  return (
    <>
      <Head>
        <title>Linx Flow</title>
      </Head>
      <main>
        <>
          {user && renderUser()}
          {!user && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link component={NLink} href="/auth/signin" title="Sign In">
                Sign In
              </Link>
            </div>
          )}
        </>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const user = await auth.getUserWithContext(ctx)
  if (user) {
    const data = (await fetchLinkConfigs({ userId: user.id || "", limit: 10 })) || []
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

const DataTable = ({
  userId,
  data,
}: {
  userId: string
  data: LinkConfig[] | null
}): JSX.Element => {
  const [newFormModalOpened, setNewFormModalOpened] = useState(false)
  const bus = useEventBus()

  const handleCopy = (formId: string) => {
    if (navigator.clipboard) {
      // todo: fix copy url
      navigator.clipboard.writeText(
        `${window.location.host}/forms/${userId}/${formId}?embed=true`
      )
      bus.emit("show-notification", { content: "Copied" })
    }
  }

  const columns = [
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
          onClick={() => setNewFormModalOpened(true)}
          icon={<Edit />}
          label="Edit"
        />,
        <GridActionsCellItem
          key="copy"
          onClick={() => handleCopy(params.id)}
          icon={<CopyAll />}
          label="Copy Link"
        />,
      ],
    },
  ]

  return (
    <Box my={8} sx={{ flexGrow: 1 }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" component="h2">
          Link Configurations
        </Typography>
        <Button
          onClick={() => setNewFormModalOpened(true)}
          title="Create New Link Configuration"
          startIcon={<Add />}
        >
          Add New
        </Button>
      </Box>
      <br />
      <Paper>
        <DataGrid
          aria-label="link config table"
          autoHeight
          pagination
          sx={{ borderRadius: "16px" }}
          columns={columns}
          rows={data || []}
          rowCount={(data && data.length) || 0}
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
        />
      </Paper>
      {/* todo: edit modal */}
      {/* <NewFormModal
        open={newFormModalOpened}
        userId={userId}
        onClose={() => setNewFormModalOpened(false)}
      /> */}
    </Box>
  )
}
