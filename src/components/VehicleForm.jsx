import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const VehicleForm = ({ open, onOpenChange, vehicle, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    licensePlate: "",
    model: "",
    year: "",
    vin: "",
    currentMileage: "",
    batteryCapacity: "",
    color: "",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        licensePlate: vehicle.licensePlate || "",
        model: vehicle.model || "",
        year: vehicle.year || "",
        vin: vehicle.vin || "",
        currentMileage: vehicle.currentMileage || "",
        batteryCapacity: vehicle.batteryCapacity || "",
        color: vehicle.color || "",
      });
    } else {
      setFormData({
        licensePlate: "",
        model: "",
        year: "",
        vin: "",
        currentMileage: "",
        batteryCapacity: "",
        color: "",
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.licensePlate || !formData.model || !formData.vin) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const data = {
        ...formData,
        year: formData.year ? parseInt(formData.year) : null,
        currentMileage: formData.currentMileage
          ? parseFloat(formData.currentMileage)
          : null,
        batteryCapacity: formData.batteryCapacity
          ? parseFloat(formData.batteryCapacity)
          : null,
      };

      if (vehicle) {
        await api.updateVehicle(vehicle.id, data);
        toast({
          title: "Thành công",
          description: "Đã cập nhật thông tin xe",
        });
      } else {
        await api.createVehicle(data);
        toast({
          title: "Thành công",
          description: "Đã thêm xe mới",
        });
      }
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.message || "Có lỗi xảy ra",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {vehicle ? "Cập nhật xe" : "Thêm xe mới"}
          </DialogTitle>
          <DialogDescription>
            {vehicle
              ? "Cập nhật thông tin xe điện của bạn"
              : "Thêm xe điện mới vào danh sách"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="licensePlate">
                Biển số xe <span className="text-destructive">*</span>
              </Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                placeholder="VD: 30A-12345"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">
                Model <span className="text-destructive">*</span>
              </Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="VD: Tesla Model 3"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vin">
                Số VIN <span className="text-destructive">*</span>
              </Label>
              <Input
                id="vin"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                placeholder="VD: 5YJ3E1EA1KF123456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year">Năm sản xuất</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="VD: 2023"
                  min="2000"
                  max={new Date().getFullYear() + 1}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Màu sắc</Label>
                <Input
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="VD: Trắng"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="currentMileage">Km hiện tại</Label>
                <Input
                  id="currentMileage"
                  name="currentMileage"
                  type="number"
                  value={formData.currentMileage}
                  onChange={handleChange}
                  placeholder="VD: 15000"
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="batteryCapacity">Dung lượng pin (kWh)</Label>
                <Input
                  id="batteryCapacity"
                  name="batteryCapacity"
                  type="number"
                  value={formData.batteryCapacity}
                  onChange={handleChange}
                  placeholder="VD: 75"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : vehicle ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleForm;
