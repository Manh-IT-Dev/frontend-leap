import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <ShieldAlert className="h-24 w-24 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold">Không có quyền truy cập</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>
        <Button asChild>
          <Link to="/">Quay về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
