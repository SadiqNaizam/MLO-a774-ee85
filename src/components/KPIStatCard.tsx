import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // For conditional classes

interface KPIStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; // e.g. <Users className="h-4 w-4 text-muted-foreground" />
  description?: string; // e.g. "+20.1% from last month"
  footerText?: string;
  changePercentage?: number; // e.g. 5 for +5%, -2 for -2%
  className?: string;
}

const KPIStatCard: React.FC<KPIStatCardProps> = ({
  title,
  value,
  icon,
  description,
  footerText,
  changePercentage,
  className,
}) => {
  console.log("Rendering KPIStatCard:", title, "Value:", value);

  let changeText = "";
  let changeColorClass = "";
  if (changePercentage !== undefined) {
    changeText = `${changePercentage > 0 ? '+' : ''}${changePercentage.toFixed(1)}%`;
    if (changePercentage > 0) changeColorClass = "text-green-600";
    else if (changePercentage < 0) changeColorClass = "text-red-600";
    else changeColorClass = "text-muted-foreground";
  }


  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className={cn("text-xs text-muted-foreground", changePercentage !== undefined && changeColorClass)}>
            {changePercentage !== undefined ? `${changeText} from last period` : description}
          </p>
        )}
      </CardContent>
      {footerText && (
        <CardFooter>
            <p className="text-xs text-muted-foreground">{footerText}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default KPIStatCard;