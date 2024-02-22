"use client";
import { Button, Table, TableCell } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface MoleculeType {
  id: number;
}

const MoleculesPage = () => {
  const [molecules, setMolecules] = useState<MoleculeType[]>([]);

  useEffect(() => {
    const fetchMolecules = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/molecules");
        setMolecules(response.data); // Set molecules in state
      } catch (error) {
        console.error("Failed to load molecules:", error);
      }
    };
    fetchMolecules();
  }, [molecules]);

  return (
    <div className="space-y-5">
      <Button>
        <Link href="/molecules/new">New Molecule</Link>
      </Button>
      <Table.Root>
        <Table.Header>
          <Table.Row align="center">
            <Table.ColumnHeaderCell>Molecule Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>File Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date Uploaded</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {molecules.map((molecule: any) => (
            <Table.Row key={molecule.id}>
              <TableCell>{molecule.name}</TableCell>
              <TableCell>{molecule.science}.sdf</TableCell>
              <TableCell>{molecule.createdAt}</TableCell>
              <TableCell>
                <div
                  className="cursor-pointer"
                  onClick={async () => {
                    // Make the function async
                    try {
                      // Use async/await to wait for the response
                      const response = await axios.delete(
                        `/api/molecules?id=${molecule.id}`
                      );
                      setMolecules(
                        molecules.filter(
                          (moleculeItem) => moleculeItem.id !== molecule.id
                        )
                      );
                      console.log(response); // Log the response data
                    } catch (error) {
                      console.error("An error occurred:", error); // Log any errors that occur
                    }
                  }}
                >
                  <FaTrashAlt />
                </div>
              </TableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default MoleculesPage;
