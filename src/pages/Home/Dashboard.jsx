import React, { useState, useEffect } from "react"; // Added hooks based on usage
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom"; // Added based on usage
import { API_PATHS } from "../../utils/apiPaths";
import { Container,Box, Typography, Grid, Fab } from "@mui/material";
import api from "../../utils/axiosInstance";
import AddIcon from "@mui/icons-material/Add";
import SummaryCard from "../../components/cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "./DeleteAlertContent"

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await api.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
  try {
    await api.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

    setOpenDeleteAlert({
      open: false,
      data: null,
    });
    fetchAllSessions();
  } catch (error) {
    console.error("Error deleting session data:", error);
  }
};

  useEffect(() => {
    fetchAllSessions();
  }, []);

  // --- MUI Render ---
  return (
    // Assumes you are using the MUI layout from our previous conversation
    <DashboardLayout>
      {/* Replaces div.container.mx-auto.p-4.pb-0 */}
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        {/* You might want a header */}
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          My Interview Sessions
        </Typography>

        {/* Replaces div.grid.grid-cols-1... */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {sessions?.map((data, index) => (
            // Replaces the implicit grid-cols-1/md:grid-cols-3
            <Grid item xs={12} md={6} lg={4} key={data?._id}>
              <SummaryCard
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "N/A"}
                questions={data?.questions?.length || "--"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            </Grid>
          ))}
        </Grid>

        {/* Replaces the <button> with a Floating Action Button (FAB) 
            This matches the UI preview from your image (image_420e69.png) */}
        <Fab
          variant="extended"
          color="primary"
          onClick={() => setOpenCreateModal(true)}
          sx={{
            position: "fixed", // Fixed in the corner
            bottom: 32,
            right: 32,
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add New
        </Fab>
      </Container>{" "}
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
   <Modal title="Delete Alert"
  isOpen={openDeleteAlert?.data}
  onClose={() => {
    setOpenDeleteAlert({ open: false, data: null });
  }}
>
  <Box sx={{ width: '30vw' }}>
    <DeleteAlertContent
      content="Are you sure you want to delete?" // Fixed typo
      onDelete={() => deleteSession(openDeleteAlert.data)} // Added closing parenthesis
    />
  </Box>
</Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
