import {AlertTriangle, Box, CheckCircle, CheckDone01, Package, Users01, Users02, UsersUp} from "@untitledui/icons";

function DashboardContent() {

    const stats = [
        {
            title: "Total Users",
            value: 116,
            icon: UsersUp,
            bg: "bg-blue-50",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Total Products",
            value: 100,
            icon: Package,
            bg: "bg-indigo-50",
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
        },
        {
            title: "Assigned Products",
            value: 10,
            icon: CheckDone01,
            bg: "bg-green-50",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            title: "Unassigned Products",
            value: 90,
            icon: AlertTriangle,
            bg: "bg-yellow-50",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },
    ];



    const products = [
        {
            title: "MacBook Pro 16”",
            type: "Laptops",
            date: "Dec 10, 2024",
            status: "In Stock",
            statusColor: "bg-green-100 text-green-700",
        },
        {
            title: "Dell XPS 13",
            type: "Laptops",
            date: "Dec 9, 2024",
            status: "In Stock",
            statusColor: "bg-green-100 text-green-700",
        },
        {
            title: "iPhone 15 Pro",
            type: "Mobile",
            date: "Dec 8, 2024",
            status: "Low Stock",
            statusColor: "bg-yellow-100 text-yellow-700",
        },
        {
            title: "iPad Air",
            type: "Tablets",
            date: "Dec 7, 2024",
            status: "In Stock",
            statusColor: "bg-green-100 text-green-700",
        },
        {
            title: "Surface Pro 9",
            type: "Tablets",
            date: "Dec 6, 2024",
            status: "Out of Stock",
            statusColor: "bg-red-100 text-red-700",
        },
    ];


    const users = [
        {
            name: "John Smith",
            email: "john.smith@ihuza.com",
            role: "Admin",
            roleColor: "bg-purple-100 text-purple-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "2 hours ago",
        },
        {
            name: "Sarah Johnson",
            email: "sarah.j@ihuza.com",
            role: "Manager",
            roleColor: "bg-blue-100 text-blue-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "5 hours ago",
        },
        {
            name: "Michael Brown",
            email: "m.brown@ihuza.com",
            role: "Staff",
            roleColor: "bg-gray-100 text-gray-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "1 day ago",
        },
        {
            name: "Emily Davis",
            email: "emily.d@ihuza.com",
            role: "Staff",
            roleColor: "bg-gray-100 text-gray-700",
            status: "Inactive",
            statusColor: "bg-red-100 text-red-700",
            lastLogin: "3 days ago",
        },
        {
            name: "David Wilson",
            email: "d.wilson@ihuza.com",
            role: "Staff",
            roleColor: "bg-gray-100 text-gray-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "6 hours ago",
        },
        {
            name: "Lisa Anderson",
            email: "lisa.a@ihuza.com",
            role: "Manager",
            roleColor: "bg-blue-100 text-blue-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "30 min ago",
        },
        {
            name: "Robert Taylor",
            email: "r.taylor@ihuza.com",
            role: "Staff",
            roleColor: "bg-gray-100 text-gray-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "2 days ago",
        },
        {
            name: "Jennifer Miller",
            email: "j.miller@ihuza.com",
            role: "Staff",
            roleColor: "bg-gray-100 text-gray-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "4 hours ago",
        },
        {
            name: "Christopher Lee",
            email: "c.lee@ihuza.com",
            role: "Admin",
            roleColor: "bg-purple-100 text-purple-700",
            status: "Active",
            statusColor: "bg-green-100 text-green-700",
            lastLogin: "1 hour ago",
        },
        {
            name: "Amanda White",
            email: "a.white@ihuza.com",
            role: "Staff",
            roleColor: "bg-gray-100 text-gray-700",
            status: "Inactive",
            statusColor: "bg-red-100 text-red-700",
            lastLogin: "1 week ago",
        },
    ];



    const RecentActivities = [
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Box className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "Product added to inventory",
            description: "MacBook Pro 16” M3 (PROD2024001)",
            date: "Dec 4, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Users02 className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "Product assigned to Sarah Johnson",
            description: "Dell ThinkPad X1 Carbon (PROD2024001)",
            date: "Dec 3, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Users02 className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "Product assigned to Michael Brown",
            description: "Apple MacBook Air M2 (PROD2024001)",
            date: "Dec 2, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Box className="h-5 w-5 text-yellow-500" />
                </div>
            ),
            title: "Product sent for maintenance",
            description: "HP Spectre x360 – Screen replacement required",
            date: "Jan 16, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Users02 className="h-5 w-5 text-green-500" />
                </div>
            ),
            title: "New user registered",
            description: "Amanda White – Staff Member",
            date: "Jan 14, 2024",
        },
    ];




    const QuickActions = [
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Box className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "View Users",
            description: "View all registered users",
            bg: "bg-blue-50",
            button: "bg-blue-500 hover:bg-blue-600",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Box className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "View Products",
            description: "View all registered products",
            bg: "bg-blue-50",
            button: "bg-blue-500 hover:bg-blue-600",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Users02 className="h-5 w-5 text-purple-800" />
                </div>
            ),
            title: "View Assignments",
            description: "View all product assignments",
            bg: "bg-purple-50",
            button: "bg-purple-500 hover:bg-purple-600",
        },
    ];

      return (
        <main className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">

            <div className="flex flex-wrap items-center justify-center w-full">
                <div className="m-4 w-full rounded-xl bg-blue-700 p-8 text-white shadow-md">
                    <div className="flex items-start gap-4">

                        {/* Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-200/40">
                            <Box className="h-5 w-5 text-white" />
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-bold text-white">
                                IHUZA INVENTORY - System Overview
                            </h1>

                            <p className="text-sm text-gray-300 mb-2">
                                Monitor your IHUZA inventory and product assignments in real-time.
                            </p>
                            <div className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                <p className="text-sm text-white">
                                    All Systems Operational
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-2xl bg-white p-6 shadow-sm flex"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                                <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                            </div>
                            <div className=" px-2 gap-4">
                                <h1 className="text-4xl font-bold text-black/80">
                                    {item.value}
                                </h1>
                                <p className="text-sm font-semibold text-gray-500">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* Content Card */}
            <div className="p-4">
                <div className="bg-white rounded-md p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">Recent Added Products</h3>
                    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="p-4 flex justify-between gap-8 border border-gray-100 rounded-md">
                                <div className="fitems-start gap-4">
                                    <h1 className="text-md text-black font-semibold mb-2">
                                        {product.title}
                                    </h1>
                                    <p className="text-sm text-gray-500 mb-1">
                                        {product.type}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {product.date}
                                    </p>
                                </div>
                                <div>
<span
    className={`px-3 py-1 rounded-full text-xs font-medium ${product.statusColor}`}
>
  {product.status}
</span>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/*{ users }*/}
            <div className="p-4">
                <div className="bg-white rounded-md p-6 shadow-sm">
                    <div className="flex gap-4 justify-between">
                        <div className="p-4">
                            <h3 className="font-semibold mb-2 text-2xl">Users</h3>
                        </div>
                        <div className="p-4">
                            <button className=" border border-blue-600 bg-blue-500 rounded-lg px-4 py-2 shadow text-white">
                                Add User
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        {/* Table Header */}
                        <div className="grid grid-cols-[250px_1fr_1fr_1fr_1fr] items-center bg-gray-100 p-4 font-medium text-gray-500">
                            <span>USER</span>
                            <span className="text-center">ROLE</span>
                            <span className="text-center">STATUS</span>
                            <span className="text-center">LAST LOGIN</span>
                            <span className="text-center">ACTIONS</span>
                        </div>

                        {/* Table Rows */}
                        {users.map((user, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[250px_1fr_1fr_1fr_1fr] items-center border-b border-gray-200 p-4 hover:bg-gray-50"
                            >
                                {/* USER: name + email */}
                                <div className="flex gap-4">
                                    <div className="p-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                        <Users02 className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                    <div className="flex flex-col p-2">
                                        <span className="font-medium text-gray-900">{user.name}</span>
                                        <span className="text-sm text-gray-500">{user.email}</span>
                                    </div>
                                </div>


                                {/* ROLE */}
                                <div className="flex gap-4 items-center justify-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.roleColor}`}>{user.role}</span>
                                </div>


                                {/* STATUS */}
                                <div className="flex gap-4 items-center justify-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.statusColor}`}>{user.status}</span>
                                </div>


                                {/* LAST LOGIN */}
                                <span className="text-center text-gray-700">{user.lastlogin}</span>

                                {/* ACTIONS */}
                                <div className="flex justify-center gap-2">
                                    <button className="text-blue-600 text-sm">Edit</button>
                                    <button className="text-red-500 text-sm">Delete</button>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

            {/*{ Recent Activity and Quick Actions}*/}

            <div className="p-4">
                <div className="flex gap-4 justify-between">
                    <div className="w-1/2 rounded-md bg-white p-6 shadow-sm">
                        <div className="flex justify-between gap-4">
                            <div className="p-4">
                                <h3 className="mb-2 text-2xl font-semibold">
                                    Recent Activity
                                </h3>
                            </div>
                            <div className="p-4">
                                <a
                                    href="#"
                                    className="cursor-pointer text-gray-600 hover:text-gray-500"
                                >
                                    view all
                                </a>
                            </div>
                        </div>

                        {RecentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex w-full gap-4 p-4"
                            >
                                {/* Icon */}
                                <div className="shrink-0">
                                    {activity.icon}
                                </div>

                                {/* Text */}
                                <div>
                                    <h1 className="font-medium">
                                        {activity.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {activity.description}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {activity.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*{ right card }*/}
                    <div className="w-1/2 rounded-md bg-white p-6 shadow-sm">
                        <h3 className="mb-6 text-2xl font-semibold">Quick Actions</h3>

                        <div className="space-y-4">
                            {QuickActions.map((quick, index) => (
                                <div
                                    key={index}
                                    className={`flex w-full items-center justify-between rounded-lg p-4 ${quick.bg}`}
                                >
                                    {/* Left: Icon + Text */}
                                    <div className="flex items-center gap-4">
                                        {quick.icon}

                                        <div>
                                            <h1 className="font-medium text-gray-900">
                                                {quick.title}
                                            </h1>
                                            <p className="text-sm text-gray-600">
                                                {quick.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Button */}
                                    <button
                                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${quick.button}`}
                                    >
                                        Go
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


            </div>
        </main>
    )
}

export default DashboardContent;