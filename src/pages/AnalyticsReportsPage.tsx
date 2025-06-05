import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Package } from 'lucide-react';


const salesOverTimeData = [
  { date: "2024-01-01", sales: 1200, orders: 30 }, { date: "2024-02-01", sales: 1800, orders: 45 },
  { date: "2024-03-01", sales: 1500, orders: 35 }, { date: "2024-04-01", sales: 2200, orders: 55 },
  { date: "2024-05-01", sales: 2500, orders: 60 }, { date: "2024-06-01", sales: 2000, orders: 50 },
  { date: "2024-07-01", sales: 2800, orders: 70 },
];
const salesChartConfig = { sales: { label: "Sales ($)", color: "hsl(var(--chart-1))" }, orders: { label: "Orders", color: "hsl(var(--chart-2))" } };

const customerAcquisitionData = [
  { month: "Jan", new: 150, retained: 500 }, { month: "Feb", new: 180, retained: 520 },
  { month: "Mar", new: 160, retained: 530 }, { month: "Apr", new: 200, retained: 550 },
  { month: "May", new: 220, retained: 580 }, { month: "Jun", new: 190, retained: 600 },
];
const customerChartConfig = { new: { label: "New Customers", color: "hsl(var(--chart-3))" }, retained: { label: "Retained Customers", color: "hsl(var(--chart-4))" } };

const reportTableData = [
    { metric: "Total Page Views", value: "150,320", change: "+12.5%" },
    { metric: "Conversion Rate", value: "3.5%", change: "+0.2%" },
    { metric: "Avg. Session Duration", value: "3m 45s", change: "-5.0%" },
    { metric: "Bounce Rate", value: "40.2%", change: "+1.8%" },
];


const AnalyticsReportsPage = () => {
  console.log('AnalyticsReportsPage loaded');
  const [reportType, setReportType] = useState('salesOverTime');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1), // Jan 1, 2024
    to: addDays(new Date(2024, 6, 31), 0), // July 31, 2024
  });

  const renderChart = () => {
    switch (reportType) {
      case 'salesOverTime':
        return (
          <ChartContainer config={salesChartConfig} className="h-[400px] w-full">
            <LineChart accessibilityLayer data={salesOverTimeData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })} />
              <YAxis yAxisId="left" stroke="var(--color-sales)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-orders)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} yAxisId="left" name="Sales ($)" />
              <Line type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} yAxisId="right" name="Orders" />
            </LineChart>
          </ChartContainer>
        );
      case 'customerAcquisition':
        return (
          <ChartContainer config={customerChartConfig} className="h-[400px] w-full">
            <BarChart accessibilityLayer data={customerAcquisitionData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="new" fill="var(--color-new)" radius={[4, 4, 0, 0]} name="New Customers" />
              <Bar dataKey="retained" fill="var(--color-retained)" radius={[4, 4, 0, 0]} name="Retained Customers" />
            </BarChart>
          </ChartContainer>
        );
      default:
        return <p>Select a report type to view data.</p>;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
         <div className="p-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6 text-primary" />
            <span className="">Admin Panel</span>
          </Link>
        </div>
        <NavigationMenu orientation="vertical" className="p-4">
          <NavigationMenuList className="flex flex-col space-y-1 w-full">
            <NavigationMenuItem className="w-full">
              <Link to="/" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/orders-management" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  Orders
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/product-performance" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
             <NavigationMenuItem className="w-full">
              <Link to="/customer-insights" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  Customers
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/analytics-reports" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-primary text-primary-foreground`}>
                  Analytics
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </aside>
      <div className="flex flex-1 flex-col">
        <Header userName="Admin User" onSearch={(query) => console.log('Search:', query)} />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Dashboard</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics & Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Select report type and date range for detailed analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salesOverTime">Sales Over Time</SelectItem>
                    <SelectItem value="customerAcquisition">Customer Acquisition</SelectItem>
                    <SelectItem value="productPerformanceSummary">Product Performance Summary</SelectItem>
                    <SelectItem value="trafficSources">Traffic Sources</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full sm:w-[300px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <Button className="w-full sm:w-auto" onClick={() => console.log("Generating report with type:", reportType, "and range:", dateRange)}>
                  Generate Report
                </Button>
                 <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              
              <div className="mt-6">
                {renderChart()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Key Metrics Summary</CardTitle>
                <CardDescription>Selected metrics for the chosen period.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Metric</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Change vs. Previous Period</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportTableData.map(row => (
                            <TableRow key={row.metric}>
                                <TableCell className="font-medium">{row.metric}</TableCell>
                                <TableCell>{row.value}</TableCell>
                                <TableCell className={row.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>{row.change}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;