import {Card, Table, TableCell, TableContainer, TableHead, TableRow} from "@suid/material";
import {graphql} from "~/gql";
import {For} from "solid-js";
import {createSubscription} from "@merged/solid-apollo";


const orderQuery = graphql(`
    subscription GetDroneOrdersSubscription {
        orders(where: {flights: {drone_id: {_eq: "1"}}}) {
            vendor {
                name
            }
            price
            food_items
            delivered_at
        }
    }
`);


export default function OrderHistoryCard() {
  const orders = createSubscription(orderQuery);

  return (
    <Card variant="outlined">
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vendor</TableCell>
              <TableCell align="right">Delivered at</TableCell>
              <TableCell align="right">items</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <For each={orders()?.orders}>
            {(order, i) =>
              <TableRow>
                <TableCell>{order.vendor.name}</TableCell>
                <TableCell align="right">{order.delivered_at}</TableCell>
                <TableCell align="right">{order.food_items?.join(", ") || "donation :)"}</TableCell>
                <TableCell align="right">${order.price}</TableCell>
              </TableRow>
            }
          </For>
        </Table>
      </TableContainer>
    </Card>
  );
}
