import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deletePet, getAllPet } from "../../services/PetServicesApi/PetService";

type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  weight: number;
  age: number;
};

const PetList = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.id;

  const [petData, setPetData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Pet | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [petToDelete, setPetToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await getAllPet(id);
        if (response.data.success) {
          const pets = response.data.data.map((pet: any) => ({
            id: pet.id,
            name: pet.name,
            type: pet.type,
            breed: pet.breed,
            weight: pet.weight,
            age: pet.age,
          }));
          setPetData(pets);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: Pet) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    if (selectedRow) {
      navigate(`/pet-register/${selectedRow.id}`);
    }
    handleCloseMenu();
  };

  const handleDelete = () => {
    if (selectedRow) {
      setPetToDelete(selectedRow.id);
      setOpenConfirmDialog(true);
    }
    handleCloseMenu();
  };

  const handleAddJournal = () => {
    if (selectedRow) {
      navigate(`/Journal-list/${selectedRow.id}`);
    }
    handleCloseMenu();
  };

  const confirmDelete = async () => {
    if (petToDelete) {
      try {
        const response = await deletePet(petToDelete);
        if (response.data.success) {
          setPetData((prevPets) => prevPets.filter((pet) => pet.id !== petToDelete));
        }
      } catch (error) {
        console.error("Error deleting pet:", error);
      } finally {
        setOpenConfirmDialog(false);
        setPetToDelete(null);
      }
    }
  };

  const columns = useMemo<MRT_ColumnDef<Pet>[]>(() => [
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "type",
      header: "Type",
      size: 100,
    },
    {
      accessorKey: "breed",
      header: "Breed",
      size: 150,
    },
    {
      accessorKey: "weight",
      header: "Weight (kg)",
      size: 100,
      Cell: ({ cell }) => `${cell.getValue()} kg`,
    },
    {
      accessorKey: "age",
      header: "Age (years)",
      size: 100,
      Cell: ({ cell }) => `${cell.getValue()} years`,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      size: 150,
      Cell: ({ row }) => (
        <div>
          <IconButton
            onClick={(event) => handleOpenMenu(event, row.original)}
            aria-label="more"
            aria-controls="action-menu"
            aria-haspopup="true"
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRow?.id === row.original.id}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            <MenuItem onClick={handleAddJournal}>Journal List</MenuItem>
          </Menu>
        </div>
      ),
    },
  ], [anchorEl, selectedRow]);

  const table = useMaterialReactTable({
    columns,
    data: petData,
    state: { isLoading: loading },
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pet List</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/pet-register")}
        >
          Create Pets
        </Button>
      </div>

      <MaterialReactTable table={table} />

      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this pet?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirmDialog(false)}
            sx={{ backgroundColor: 'red', color: 'white' }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
           
            sx={{ backgroundColor: '#1976d2', color: 'white' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PetList;
