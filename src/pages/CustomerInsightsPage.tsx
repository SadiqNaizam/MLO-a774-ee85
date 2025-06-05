import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Package, Search, Users, Briefcase, CalendarDays, DollarSign } from 'lucide-react';

const sampleCustomers = [
  { id: 'CUST001', name: 'Alice Johnson', email: 'alice.j@example.com', totalSpending: 1250.75, orders: 15, registrationDate: '2023-01-10', lastActivity: '2024-07-25', avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'CUST002', name: 'Robert Smith', email: 'bob.s@example.com', totalSpending: 875.20, orders: 8, registrationDate: '2023-03-22', lastActivity: '2024-07-20', avatarUrl: 'https://i.pravatar.cc/150?u=robert' },
  { id: 'CUST003', name: 'Carol Williams', email: 'carol.w@example.com', totalSpending: 2400.50, orders: 22, registrationDate: '2022-11-05', lastActivity: '2024-07-28', avatarUrl: 'https://i.pravatar.cc/150?u=carol' },
  { id: 'CUST004', name: 'David Brown', email: 'dave.b@example.com', totalSpending: 350.00, orders: 3, registrationDate: '2024-02-15', lastActivity: '2024-06-30', avatarUrl: 'https://i.pravatar.cc/150?u=david' },
  { id: 'CUST005', name: 'Eva Green', email: 'eva.g@example.com', totalSpending: 1890.00, orders: 18, registrationDate: '2023-05-01', lastActivity: '2024-07-15', avatarUrl: 'https://i.pravatar.cc/150?u=eva' },
];

const CustomerInsightsPage = () => {
  console.log('CustomerInsightsPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = sampleCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/customer-insights" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-primary text-primary-foreground`}>
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
                <BreadcrumbPage>Customer Insights</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{sampleCustomers.length}</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Spending</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${(sampleCustomers.reduce((acc, c) => acc + c.totalSpending, 0) / sampleCustomers.length).toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">Average per customer</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Orders</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{(sampleCustomers.reduce((acc, c) => acc + c.orders, 0) / sampleCustomers.length).toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">Average orders per customer</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Signups (Month)</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+52</div>
                    <p className="text-xs text-muted-foreground">New customers this month</p>
                </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Browse and search customer information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                 <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Name or Email..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Button>Add New Customer</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Spending</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>${customer.totalSpending.toFixed(2)}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.registrationDate}</TableCell>
                      <TableCell>{customer.lastActivity}</TableCell>
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

export default CustomerInsightsPage;