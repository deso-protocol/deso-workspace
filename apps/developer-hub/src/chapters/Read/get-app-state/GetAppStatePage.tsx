import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAppState } from "./get-app-state";

export const GetAppStatePage = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  useEffect(() => {
    getAppState().then((response) => {
      setNodes(
        (Object.values(response.Nodes) as any[]).map((node) => {
          return node;
        })
      );
    });
  }, []);
  return (
    <div className="mx-auto mt-20 max-w-[1160px] pb-2 w-full bg-[#fff] min-h-[800px] rounded-lg">
      {nodes.length > 0 && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">URL</TableCell>
              <TableCell align="left">Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((node) => (
              <TableRow
                key={node.Name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{node.Name}</TableCell>
                <TableCell align="left">{node.URL}</TableCell>
                <TableCell align="left">{node.Owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
