import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Car, Package, FileText, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Chào mừng trở lại!</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý xe và lịch bảo dưỡng của bạn
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xe của tôi</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Đang quản lý</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lịch hẹn</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Sắp tới</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gói dịch vụ</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Đang hoạt động</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lịch sử</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Lần bảo dưỡng</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
            <CardDescription>Các tác vụ thường dùng</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button asChild className="h-auto flex-col items-start gap-2 p-4">
              <Link to="/customer/appointments/new">
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  <span className="font-semibold">Đặt lịch bảo dưỡng</span>
                </div>
                <p className="text-xs text-left opacity-90">
                  Đặt lịch hẹn bảo dưỡng hoặc sửa chữa
                </p>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto flex-col items-start gap-2 p-4">
              <Link to="/customer/vehicles/add">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  <span className="font-semibold">Thêm xe mới</span>
                </div>
                <p className="text-xs text-left text-muted-foreground">
                  Thêm xe vào hệ thống quản lý
                </p>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto flex-col items-start gap-2 p-4">
              <Link to="/customer/packages">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  <span className="font-semibold">Xem gói dịch vụ</span>
                </div>
                <p className="text-xs text-left text-muted-foreground">
                  Khám phá các gói bảo dưỡng
                </p>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lịch hẹn sắp tới</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/customer/appointments">
                  Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-primary bg-accent/50 p-4 rounded">
                <div>
                  <p className="font-semibold">Bảo dưỡng định kỳ</p>
                  <p className="text-sm text-muted-foreground">Tesla Model 3 - BKS: 30A-12345</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    15/12/2024 - 09:00 AM
                  </p>
                </div>
                <Button size="sm">Chi tiết</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Reminders */}
        <Card>
          <CardHeader>
            <CardTitle>Nhắc nhở bảo dưỡng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-warning bg-warning/10 p-4 rounded">
                <div>
                  <p className="font-semibold">Bảo dưỡng 10,000 km</p>
                  <p className="text-sm text-muted-foreground">VinFast VF8 - BKS: 51G-67890</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Còn 500 km nữa cần bảo dưỡng
                  </p>
                </div>
                <Button size="sm" variant="outline">Đặt lịch</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
