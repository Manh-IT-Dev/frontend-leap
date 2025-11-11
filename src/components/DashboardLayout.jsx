import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Calendar,
  Car,
  FileText,
  Package,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children, role = "customer" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getMenuItems = () => {
    const baseItems = {
      customer: [
        { icon: LayoutDashboard, label: "Tổng quan", path: "/customer/dashboard" },
        { icon: Car, label: "Xe của tôi", path: "/customer/vehicles" },
        { icon: Calendar, label: "Lịch hẹn", path: "/customer/appointments" },
        { icon: FileText, label: "Lịch sử dịch vụ", path: "/customer/history" },
        { icon: Package, label: "Gói dịch vụ", path: "/customer/packages" },
        { icon: MessageSquare, label: "Tin nhắn", path: "/customer/messages" },
      ],
      staff: [
        { icon: LayoutDashboard, label: "Tổng quan", path: "/staff/dashboard" },
        { icon: Calendar, label: "Quản lý lịch hẹn", path: "/staff/appointments" },
        { icon: Users, label: "Khách hàng", path: "/staff/customers" },
        { icon: Car, label: "Xe", path: "/staff/vehicles" },
        { icon: FileText, label: "Phiếu dịch vụ", path: "/staff/tickets" },
        { icon: MessageSquare, label: "Tin nhắn", path: "/staff/messages" },
      ],
      technician: [
        { icon: LayoutDashboard, label: "Tổng quan", path: "/technician/dashboard" },
        { icon: Calendar, label: "Lịch làm việc", path: "/technician/appointments" },
        { icon: FileText, label: "Phiếu bảo dưỡng", path: "/technician/tickets" },
        { icon: Package, label: "Phụ tùng", path: "/technician/parts" },
      ],
      admin: [
        { icon: LayoutDashboard, label: "Tổng quan", path: "/admin/dashboard" },
        { icon: Users, label: "Quản lý nhân sự", path: "/admin/users" },
        { icon: Calendar, label: "Lịch hẹn", path: "/admin/appointments" },
        { icon: FileText, label: "Phiếu dịch vụ", path: "/admin/tickets" },
        { icon: Package, label: "Kho phụ tùng", path: "/admin/inventory" },
        { icon: Car, label: "Xe", path: "/admin/vehicles" },
        { icon: Settings, label: "Cài đặt", path: "/admin/settings" },
      ],
    };

    return baseItems[role] || baseItems.customer;
  };

  const menuItems = getMenuItems();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              {sidebarOpen && <span className="font-bold text-lg">EV Service</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user?.fullName || user?.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">{user?.fullName || user?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
