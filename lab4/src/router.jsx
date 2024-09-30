import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import ViewOrderConfirm from "./ViewOrderConfirm";
import {inventoryLoader} from "./saladBarLoader";
const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad,
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>,
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children:[
            {
                path:"confirm/:orderId", 
                Component: ViewOrderConfirm,
                //element: <p>Viewing order with id</p>,
            }
        ]
      },
      {
        path:"*",
        element: <p>Page Not Found</p>
      }

    ],
  },
]);
export default router;
