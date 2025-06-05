import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import OrderStatusTimeline from '@/components/OrderStatusTimeline';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Filter, MoreHorizontal, Truck, UserCircle, MapPin } from 'lucide-react';

const sampleOrders = [
  { id: 'ORD101', customer: 'Ella Fitzgerald', date: '2024-07-28', total: 125.00, status: 'Processing', items: [{ name: 'Vintage Mic', qty: 1, price: 125.00 }], shippingAddress: '123 Jazz St, New Orleans, LA', customerAvatar: 'https://via.placeholder.com/40/E74C3C/FFFFFF?Text=EF' },
  { id: 'ORD102', customer: 'Louis Armstrong', date: '2024-07-27', total: 88.50, status: 'Shipped', items: [{ name: 'Trumpet Polish', qty: 2, price: 20.00 }, { name: 'Music Stand', qty: 1, price: 48.50 }], shippingAddress: '456 Swing Ave, Chicago, IL', customerAvatar: 'https://via.placeholder.com/40/2ECC71/FFFFFF?Text=LA' },
  { id: 'ORD103', customer: 'Billie Holiday', date: '2024-07-26', total: 210.75, status: 'Delivered', items: [{ name: 'Silk Scarf', qty: 1, price: 150.00 }, { name: 'Gardenias', qty: 5, price: 12.15 }], shippingAddress: '789 Blues Ln, New York, NY', customerAvatar: 'https://via.placeholder.com/40/3498DB/FFFFFF?Text=BH' },
  { id: 'ORD104', customer: 'Duke Ellington', date: '2024-07-25', total: 55.20, status: 'Pending', items: [{ name: 'Piano Key Cleaner', qty: 1, price: 55.20 }], shippingAddress: '101 Harmony Rd, Washington, DC', customerAvatar: 'https://via.placeholder.com/40/F1C40F/000000?Text=DE' },
];

const orderTimelineStatuses = [
    { id: 1, name: 'Order Placed', date: '2024-07-28 10:00 AM', completed: true, current: false, icon: <Package className="h-5 w-5" /> },
    { id: 2, name: 'Payment Confirmed', date: '2024-07-28 10:05 AM', completed: true, current: false },
    { id: 3, name: 'Processing', date: '2024-07-28 11:00 AM', completed: true, current: true },
    { id: 4, name: 'Shipped', completed: false, current: false, icon: <Truck className="h-5 w-5" /> },
    { id: 5, name: 'Delivered', completed: false, current: false },
];


const OrdersManagementPage = () => {
  console.log('OrdersManagementPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof sampleOrders[0] | null>(null);

  const filteredOrders = sampleOrders.filter(order => 
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status.toLowerCase() === statusFilter)
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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-primary text-primary-foreground`}>
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
        <Header userName="Admin User" onSearch={(query) => setSearchTerm(query)} />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Dashboard</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Orders Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card>
            <CardHeader>
              <CardTitle>Manage Orders</CardTitle>
              <CardDescription>View, search, and filter customer orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Order ID or Customer..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} onClick={() => setSelectedOrder(order)}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={
                            order.status === 'Delivered' ? 'default' :
                            order.status === 'Shipped' ? 'secondary' :
                            order.status === 'Processing' ? 'outline' :
                            'destructive'
                          }>{order.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DialogTrigger asChild>
                           <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>View Details</Button>
                        </DialogTrigger>
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
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>

          {selectedOrder && (
            <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                  <DialogDescription>Customer: {selectedOrder.customer} - Date: {selectedOrder.date}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary" />Customer Information</h4>
                            <p><img src={selectedOrder.customerAvatar} alt={selectedOrder.customer} className="w-10 h-10 rounded-full inline mr-2" /> {selectedOrder.customer}</p>
                            <p className="text-sm text-muted-foreground">Email: {selectedOrder.customer.toLowerCase().replace(' ','_')}@example.com</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary" />Shipping Address</h4>
                            <p>{selectedOrder.shippingAddress}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center"><Package className="mr-2 h-5 w-5 text-primary" />Order Items</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedOrder.items.map(item => (
                                    <TableRow key={item.name}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>${(item.qty * item.price).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <p className="text-right font-semibold mt-2">Total: ${selectedOrder.total.toFixed(2)}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2 flex items-center"><Truck className="mr-2 h-5 w-5 text-primary" />Order Status Timeline</h4>
                        <OrderStatusTimeline statuses={orderTimelineStatuses} orientation="horizontal" />
                    </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedOrder(null)}>Close</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default">Actions <MoreHorizontal className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrdersManagementPage;