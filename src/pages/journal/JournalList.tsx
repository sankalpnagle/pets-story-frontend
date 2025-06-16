import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteJaurnalByPetId,
  getJaurnalByPetId,
} from "../../services/JournalAPI/JournalService";
import { toast } from "react-toastify";

const JournalList = () => {
  const id = useParams().id; 
  const navigate = useNavigate();
  const [data, setData] = useState([]); 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);


  const fetchPetData = async () => {
    try {
      const res = await getJaurnalByPetId(id);
      console.log("API response:", res.data);
      setData(res.data?.data || []); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); 
    }
  };

  useEffect(() => {
    fetchPetData();
  }, []);

 
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

 
  const handleEdit = () => {
    if (selectedRow) {
      navigate(`/Journal-register/${selectedRow.original.id}`);
    }
    handleCloseMenu();
  };

  
  const handleDelete = async () => {
    try {
      const entryId = selectedRow.original.id;
      const res = await DeleteJaurnalByPetId(entryId);
      if (res.status === 200) {
        toast.success("Journal deleted successfully!");
        fetchPetData(); 
      }
    } catch (error) {
      console.error("Error deleting journal:", error);
      toast.error("Failed to delete. Please try again.");
    } finally {
      handleCloseMenu();
    }
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: "date",
      header: "Date",
      size: 150,
      Cell: ({ cell }) => {
        const rawDate = cell.getValue();
        const formattedDate = new Date(rawDate).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return formattedDate;
      },
    },
    { accessorKey: "appetite", header: "Appetite", size: 50 },
    { accessorKey: "behavior", header: "Behavior", size: 50 },
    { accessorKey: "category", header: "Category", size: 100 },
    { accessorKey: "digestion", header: "Digestion", size: 100 },
    { accessorKey: "duration", header: "Duration", size: 100 },
    { accessorKey: "severity", header: "Severity", size: 100 },
    { accessorKey: "notes", header: "Notes", size: 100 },
    {
      accessorKey: "actions",
      header: "Actions",
      size: 50,
      Cell: ({ row }) => (
        <>
          <IconButton
            onClick={(event) => handleOpenMenu(event, row)}
            aria-label="more"
            aria-controls="action-menu"
            aria-haspopup="true"
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRow?.id === row.id}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ], [anchorEl, selectedRow]);

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Tooltip title="Back">
          <IconButton
            onClick={() => navigate("/pet-list")}
            aria-label="back"
            sx={{ color: "primary.main" }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          onClick={() => navigate(`/Journal-register/${id}`)}
        >
          Add Journal
        </Button>
      </div>
      
        <MaterialReactTable table={table} />
      
    </div>
  );
};

export default JournalList;
