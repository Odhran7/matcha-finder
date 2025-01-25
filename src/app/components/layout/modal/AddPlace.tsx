"use client";
import { useState } from "react";
import { useModal } from "@/app/contexts/Modal/ModalContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Result {
  name: string;
  addressOne: string;
  addressTwo: string;
  longitude: number;
  latitude: number;
}

const AddPlace = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { closeModal } = useModal();

  const handleClick = async (
    name: string,
    longitude: number,
    latitude: number
  ) => {
    try {
      const response = await fetch("/api/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, longitude, latitude }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      closeModal();
    } catch (error) {
      console.error(`Error saving new place to db ${error}`);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(address + ", Ireland")}`
      );
      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert(`Failed to geocode address: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Place</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-5">
        <div>
          <label className="block mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter address"
            required
          />
        </div>
        <div className="flex justify-start space-x-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {loading ? "Loading..." : "Search for places"}
          </button>
        </div>
      </form>
      {results.length > 0 ? (
        <Table>
          <TableCaption>Your search results.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Address Line One</TableHead>
              <TableHead>Address Line Two</TableHead>
              <TableHead className="text-right">Add</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: Result, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{result.name}</TableCell>
                <TableCell>{result.addressOne}</TableCell>
                <TableCell>{result.addressTwo}</TableCell>
                <TableCell
                  className="text-right cursor-pointer text-matchaGreen font-bold rounded"
                  onClick={() =>
                    handleClick(result.name, result.latitude, result.longitude)
                  }
                >
                  Add
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-matchaGreen">
          No search results add one manually by clicking on the map!
        </p>
      )}
    </div>
  );
};

export default AddPlace;
