import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import { notifications } from "@/containers/Profile/constants";
import { OrdersList } from "@/containers/Orders/components/List";
import { CustomersList } from "@/containers/Customers/components/List";

export default function Profile() {
  return (
    <div className="flex gap-4">
      <div className="w-1/4">
        <Card>
          <CardHeader>
            <div className="flex justify-end">
              <Button className="flex" variant="outline" size="icon">
                <Pencil1Icon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center text-center justify-center flex-col">
              <Avatar className="w-[60px] h-[60px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              {notifications.map((notification, index) => (
                <div key={index} className="grid items-start pb-4 last:pb-0">
                  <div className="w-full">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-3/4">
        <Card>
          <CardHeader>
            <Tabs defaultValue="myOrder" className="w-full">
              <TabsList>
                <TabsTrigger value="myOrder">My order</TabsTrigger>
                <TabsTrigger value="customerList">Customer List</TabsTrigger>
              </TabsList>
              <TabsContent value="myOrder">
                <OrdersList />
              </TabsContent>
              <TabsContent value="customerList">
                <CustomersList />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
