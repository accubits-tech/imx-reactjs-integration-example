import Bridging from "../Bridging";
import Inventory from "../Inventory";
import Marketplace from "../Marketplace";
import Listings from "../Listings";
import Signing from "../Signing";
import { Navigate } from "react-router-dom";
import AssetDetails from "../Components/AssetDetails/AssetDetails";
import Minting from "../Minting";

const Router = () => {
    const RedirectHandler = () => {
        return <Navigate to="/listing" />
    }
    const routes = [
        {
            skip: true,
            path: '/listing',
            element: Listings,
        },
        {
            skip: false,
            path: '/inventory',
            element: Inventory,
        },
        {
            skip: false,
            path: '/deposit',
            element: Bridging,
        },
        {
            skip: false,
            path: '/withdrawal',
            element: Bridging,
        },
        {
            skip: false,
            path: '/signing',
            element: Signing
        },
        {
            skip: true,
            path: '/',
            element: RedirectHandler
        },
        {
            skip: false,
            path: '/marketplace',
            element: Marketplace
        },
        {
            skip: true,
            path: '/:pageName/assets/:id',
            element: AssetDetails
        },
        {
            skip: false,
            path: '/minting',
            element: Minting
        }
    ];
    return routes;
}

export default Router