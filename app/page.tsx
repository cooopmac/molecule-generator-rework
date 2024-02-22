"use client";
import { Button, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [moleculeList, setMoleculeList] = useState([]);

  const getMoleculeSVG = (value: String) => {
    //get svg
  };

  useEffect(() => {
    const fetchMoleculeName = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/molecules");
        const data = response.data;
        console.log(data);
        let namesList = data.map((item: { name: any }) => item.name);
        setMoleculeList(namesList);
      } catch (error) {
        console.error("Failed to load molecules:", error);
      }
    };
    fetchMoleculeName();
  }, []);

  return (
    <div className="flex gap-5">
      <div className="space-y-4 border border-zinc-500 w-60 w- p-5 rounded-xl">
        <h1 className="text-center font-bold">Create Element</h1>
        <form className="max-w-sm space-y-4">
          <TextField.Root>
            <TextField.Input placeholder="Element Name" />
          </TextField.Root>
          <TextField.Root>
            <TextField.Input placeholder="Element Code" />
          </TextField.Root>
          <div className="flex gap-5">
            <h1 className="text-sm text-zinc-500">Color 1:</h1>
            <input type="color"></input>
          </div>
          <TextField.Root>
            <TextField.Input placeholder="Element Radius" />
          </TextField.Root>

          <div className="flex justify-center">
            <Button>Create</Button>
          </div>
          <h1 className="text-center font-bold pt-32">Select Molecule</h1>
          <div className="flex justify-center">
            <Select.Root defaultValue="water" onValueChange={getMoleculeSVG}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Molecules</Select.Label>
                  {moleculeList.map((molecule: any) => (
                    <Select.Item key={molecule} value={molecule}>
                      {molecule}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </form>
      </div>
      <canvas className="border border-zinc-500 w-full rounded-xl"></canvas>
    </div>
  );
}
