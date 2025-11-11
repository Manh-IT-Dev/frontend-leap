import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Gauge,
  Battery,
  Palette,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import VehicleForm from "@/components/VehicleForm";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchVehicleDetail();
    fetchAppointments();
  }, [id]);

  const fetchVehicleDetail = async () => {
    try {
      setLoading(true);
      const data = await api.getVehicle(id);
      setVehicle(data);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải thông tin xe",
        variant: "destructive",
      });
      navigate("/customer/vehicles");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await api.getAppointments({ vehicleId: id });
      setAppointments(data || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      SCHEDULED: { label: "Đã đặt", variant: "outline" },
      CONFIRMED: { label: "Đã xác nhận", variant: "default" },
      CHECKED_IN: { label: "Đã check-in", variant: "secondary" },
      IN_PROGRESS: { label: "Đang xử lý", variant: "default" },
      COMPLETED: { label: "Hoàn thành", variant: "default" },
      CANCELLED: { label: "Đã hủy", variant: "destructive" },
    };

    const config = statusConfig[status] || { label: status, variant: "outline" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <DashboardLayout role="customer">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Đang tải...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!vehicle) {
    return null;
  }

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/customer/vehicles")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{vehicle.licensePlate}</h1>
              <p className="text-muted-foreground">{vehicle.model}</p>
            </div>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin xe</CardTitle>
              <CardDescription>Chi tiết thông số kỹ thuật</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Năm sản xuất</p>
                    <p className="text-muted-foreground">{vehicle.year || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gauge className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Km hiện tại</p>
                    <p className="text-muted-foreground">
                      {vehicle.currentMileage?.toLocaleString() || "0"} km
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Battery className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Dung lượng pin</p>
                    <p className="text-muted-foreground">
                      {vehicle.batteryCapacity || "N/A"} kWh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Màu sắc</p>
                    <p className="text-muted-foreground">{vehicle.color || "N/A"}</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Số VIN</p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {vehicle.vin}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trạng thái bảo dưỡng</CardTitle>
              <CardDescription>Thông tin bảo dưỡng gần đây</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Bảo dưỡng lần cuối</p>
                    <p className="text-xs text-muted-foreground">
                      {appointments.length > 0
                        ? format(new Date(appointments[0].scheduledTime), "dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "Chưa có"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Bảo dưỡng tiếp theo</p>
                    <p className="text-xs text-muted-foreground">
                      Theo lịch của bạn
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lịch sử bảo dưỡng & dịch vụ</CardTitle>
            <CardDescription>
              Tổng số {appointments.length} lịch hẹn
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Chưa có lịch sử dịch vụ</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngày hẹn</TableHead>
                    <TableHead>Loại dịch vụ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ghi chú</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        {format(
                          new Date(appointment.scheduledTime),
                          "dd/MM/yyyy HH:mm",
                          { locale: vi }
                        )}
                      </TableCell>
                      <TableCell>{appointment.serviceType || "N/A"}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {appointment.notes || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <VehicleForm
        open={formOpen}
        onOpenChange={setFormOpen}
        vehicle={vehicle}
        onSuccess={() => {
          fetchVehicleDetail();
          setFormOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default VehicleDetail;
