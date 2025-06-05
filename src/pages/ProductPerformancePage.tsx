import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Package, Search, Filter, BarChart3, Percent } from 'lucide-react';

const sampleProducts = [
  { id: 'PROD001', name: 'Premium Wireless Headphones', category: 'Electronics', unitsSold: 1200, revenue: 179988.00, stock: 250, salesVelocity: 85, status: 'In Stock', imageUrl: 'https://via.placeholder.com/60/3498DB/FFFFFF?Text=PWH' },
  { id: 'PROD002', name: 'Organic Green Tea', category: 'Groceries', unitsSold: 3500, revenue: 34965.00, stock: 800, salesVelocity: 60, status: 'In Stock', imageUrl: 'https://via.placeholder.com/60/2ECC71/FFFFFF?Text=OGT' },
  { id: 'PROD003', name: 'Smart Fitness Tracker', category: 'Wearables', unitsSold: 850, revenue: 84915.00, stock: 50, salesVelocity: 92, status: 'Low Stock', imageUrl: 'https://via.placeholder.com/60/E74C3C/FFFFFF?Text=SFT' },
  { id: 'PROD004', name: 'Leather Messenger Bag', category: 'Fashion', unitsSold: 400, revenue: 59960.00, stock: 15, salesVelocity: 70, status: 'Low Stock', imageUrl: 'https://via.placeholder.com/60/F39C12/FFFFFF?Text=LMB' },
  { id: 'PROD005', name: 'Stainless Steel Water Bottle', category: 'Home Goods', unitsSold: 2200, revenue: 54978.00, stock: 0, salesVelocity: 75, status: 'Out of Stock', imageUrl: 'https://via.placeholder.com/60/9B59B6/FFFFFF?Text=SWB' },
];

const productSalesChartData = sampleProducts.slice(0, 5).map(p => ({ name: p.name.substring(0,15) + "...", sales: p.unitsSold }));
const productChartConfig = { sales: { label: "Units Sold", color: "hsl(var(--chart-2))" } };

const ProductPerformancePage = () => {
  console.log('ProductPerformancePage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = sampleProducts.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter)
  );

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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-primary text-primary-foreground`}>
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
        <Header userName="Admin User" onSearch={(query) => console.log('Search:', query)} />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Dashboard</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Performance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Units sold for the top products.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={productChartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={productSalesChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
              <CardDescription>View and manage product inventory and performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Product Name or ID..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="wearables">Wearables</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="home goods">Home Goods</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export Data</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell><img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md" /></TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.unitsSold}</TableCell>
                      <TableCell>${product.revenue.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{product.stock} units</span>
                          <Progress value={(product.stock / (product.category === 'Electronics' ? 500 : 1000)) * 100} className="w-24 h-2" /> 
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'In Stock' ? 'default' : (product.status === 'Low Stock' ? 'secondary' : 'destructive')}>{product.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProductPerformancePage;