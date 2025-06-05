import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import KPIStatCard from '@/components/KPIStatCard';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "@/components/ui/chart"; // Assuming BarChart and LineChart are available or using recharts directly
import { DollarSign, ShoppingCart, Users, LineChart as LineChartIcon, Package, CreditCard } from 'lucide-react';

const chartDataSales = [
  { date: '2024-07-01', sales: 2000 },
  { date: '2024-07-02', sales: 2500 },
  { date: '2024-07-03', sales: 1800 },
  { date: '2024-07-04', sales: 2700 },
  { date: '2024-07-05', sales: 3200 },
  { date: '2024-07-06', sales: 2900 },
  { date: '2024-07-07', sales: 3500 },
];

const chartConfigSales = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

const recentOrders = [
  { id: 'ORD001', customer: 'Alice Wonderland', date: '2024-07-28', total: '$150.00', status: 'Shipped', payment: 'Paid' },
  { id: 'ORD002', customer: 'Bob The Builder', date: '2024-07-28', total: '$75.50', status: 'Processing', payment: 'Pending' },
  { id: 'ORD003', customer: 'Charlie Brown', date: '2024-07-27', total: '$220.25', status: 'Delivered', payment: 'Paid' },
  { id: 'ORD004', customer: 'Diana Prince', date: '2024-07-27', total: '$99.99', status: 'Pending', payment: 'Unpaid' },
];

const DashboardOverviewPage = () => {
  console.log('DashboardOverviewPage loaded');

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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-primary text-primary-foreground`}>
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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  Analytics
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </aside>
      <div className="flex flex-1 flex-col">
        <Header userName="Admin User" userAvatarUrl="https://via.placeholder.com/40" notificationsCount={3} onSearch={(query) => console.log('Search:', query)} />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Dashboard</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPIStatCard title="Total Revenue" value="$45,231.89" icon={<DollarSign className="h-5 w-5 text-muted-foreground" />} description="+20.1% from last month" changePercentage={20.1} />
            <KPIStatCard title="New Customers" value="+2350" icon={<Users className="h-5 w-5 text-muted-foreground" />} description="+180.1% from last month" changePercentage={180.1} />
            <KPIStatCard title="New Orders" value="+12,234" icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />} description="+19% from last month" changePercentage={19} />
            <KPIStatCard title="Average Order Value" value="$89.50" icon={<CreditCard className="h-5 w-5 text-muted-foreground" />} description="-2.5% from last month" changePercentage={-2.5} />
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
                <CardDescription>A quick look at sales performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigSales} className="h-[300px] w-full">
                  <LineChart accessibilityLayer data={chartDataSales} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Line dataKey="sales" type="monotone" stroke="var(--color-sales)" strokeWidth={2} dot={true} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Feed of important events and alerts.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {[
                      { title: "New order #ORD005 received", time: "5m ago", type: "order" },
                      { title: "User 'john.doe@example.com' registered", time: "1h ago", type: "user" },
                      { title: "Stock low for 'Product X'", time: "3h ago", type: "alert" },
                      { title: "Payment processed for #ORD001", time: "Yesterday", type: "payment" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`mt-1 h-2 w-2 rounded-full ${activity.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`} />
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>A summary of the latest orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === 'Delivered' ? 'default' : // 'default' for success-like
                            order.status === 'Shipped' ? 'secondary' :
                            order.status === 'Processing' ? 'outline' : // 'outline' for warning-like
                            'destructive' // for 'Pending' or 'Cancelled'
                          }>{order.status}</Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant={order.payment === 'Paid' ? 'default' : 'destructive'}>
                            {order.payment}
                           </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;