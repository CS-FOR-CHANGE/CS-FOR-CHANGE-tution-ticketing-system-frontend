import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { BG_COLOR_SECONDATY } from "./Colors";
import { useSelector } from "react-redux";
import { BackendLink } from "./BackendLink";
import postDataAuth from "./data/PostDataAuth";
import { retrieveTokens } from "./tokens/getToken";
import { deleteToken } from "./tokens/deleteToken";
import { Link } from "react-router-dom";
import ProfileModal from "../components/Header/ProfileModal";

const pages = [
    { name: "Student", link: "/student" },
    { name: "Tutor", link: "/tutor" },
    { name: "Edmonds College", link: "https://www.edmonds.edu/" },
];

function ResponsiveAppBar() {
    const [OpenProfileModal, setOpenProfileModal] = React.useState(false);
    const User = useSelector((state) => state.User.user);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const settings = [
        {
            name: "Profile",
            actionHandler: () => {
                setOpenProfileModal(true);
            },
        },
        {
            name: "Logout",
            actionHandler: async () => {
                const token = await retrieveTokens();

                const data = {
                    accessToken: token.accessToken,
                    refresh_token: token.refreshToken,
                };

                postDataAuth("/api/users/user/logout/", data).then((data) => {
                    deleteToken();
                });
            },
        },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: BG_COLOR_SECONDATY }}>
            <Container maxWidth="xl">
                <ProfileModal
                    Open={OpenProfileModal}
                    setOpen={setOpenProfileModal}
                />

                <Toolbar disableGutters>
                    <Box
                        className="hideOnSmallScreens"
                        sx={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "100px",
                            paddingRight: "5px",
                        }}
                    >
                        <img
                            src="/Images/Logos/Edmonds college logo.jpg"
                            alt="Edmonds college logo"
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Edmonds College
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link to={page.link}>
                                        <Typography textAlign="center">
                                            {page.name}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "100px",
                            paddingRight: "5px",
                            // Use object syntax for responsive styles
                            display: {
                                xs: "block", // Visible on xs sizes
                                md: "none", // Hide starting from md sizes (900px and above)
                            },
                        }}
                    >
                        <img
                            src="/Images/Logos/Edmonds college logo.jpg"
                            alt="Edmonds college logo"
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Edmonds College
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Link key={page.name} to={page.link}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                {User ? (
                                    <Avatar
                                        alt={User.name}
                                        src={BackendLink + User.photo}
                                    />
                                ) : (
                                    <Box></Box>
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Box sx={{ padding: "10px 20px" }}>
                                {User ? (
                                    <Typography
                                        textAlign="center"
                                        fontWeight={700}
                                        fontSize="17px"
                                    >
                                        {User.name}
                                    </Typography>
                                ) : (
                                    <Box></Box>
                                )}
                                <Box sx={{ borderBottom: 1, mb: "10px" }}></Box>
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            setting.actionHandler();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Box>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
