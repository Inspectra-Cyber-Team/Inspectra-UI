"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useGetAllNotificationQuery, useMarkAsReadMutation } from "@/redux/service/notification";
import { NotificationType } from "@/types/Notification";
import { useToast } from "./hooks/use-toast";

const notifications1 = [
  { id: 1, title: "Reply Comment", description: "You have a new Reply Comment from Phiv Lyhou", time: "5m ago" },
  { id: 2, title: "Reply Comment", description: "You have a new Reply Comment from Naikim", time: "10m ago" },
  { id: 3, title: "Reply Comment", description: "You have a new Reply Comment from Votey", time: "1h ago" },
];

export function Notification() {


  const {toast} = useToast();


  const [unreadCount, setUnreadCount] = React.useState(0);

  const router = useRouter();

  // calling notification data 
  const {data} = useGetAllNotificationQuery({page:0,size:25});

  // calling function mark  as read

  const [handleMarkAsRead] = useMarkAsReadMutation();

  const [notifications, setNotifications] = React.useState<NotificationType[]>([]);

  React.useEffect(() => {
    if(data){
      setNotifications(data?.content || []);
      setUnreadCount(data?.content?.length || 0);
    }
  }, [data]);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

   const receivedUuidsRef = React.useRef<Set<string>>(new Set()); 

 
   React.useEffect(() => {
     const connectWebSocket = () => {
       const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);
 
       ws.onopen = () => console.log("WebSocket connection established.");
       
       ws.onmessage = (event) => {
         try {
           const newComment = JSON.parse(event.data);

           console.log("new comment ",newComment);
 
           if (newComment?.data?.uuid && (newComment.event === "new-comment" || newComment?.event === "new-reply")  && !receivedUuidsRef.current.has(newComment?.data?.uuid)) {
           
             setNotifications((prevData) => [newComment.data,...prevData]);

             receivedUuidsRef.current.add(newComment?.data?.uuid);

           } else if (newComment?.event === "mark-read") {
            
              setNotifications((prevData) => prevData.filter((notification) => notification.uuid !== newComment?.data?.uuid));

              receivedUuidsRef.current.delete(newComment.data.uuid);

              setUnreadCount((prevCount) => prevCount - 1);

           }

         } catch (error) {
           console.error("Error parsing WebSocket message:", error);
         }
       };
 
       ws.onerror = () => console.error("WebSocket error occurred.");
       ws.onclose = () => console.log("WebSocket closed.");
 
       setSocket(ws);
     };
 
     if (!socket) connectWebSocket();
 
     return () => {
       socket?.close();
     };
   }, [socket]);


  //  function mark as read
  const handleNotificationMarkAsRead = async (uuid:string) => {

    if (!uuid) return;

    try {

      await handleMarkAsRead({notificationUuid:uuid});
  

    } catch  {
      
      toast({
        description: "Failed to mark as read",
        variant: "error",
      })
      
    }

  }


  const handleNotificationClick = (uuid:string,notificationUuid:string) => {
    router.push(`/blog/${uuid}`);
    handleNotificationMarkAsRead(notificationUuid);
  };

  const markAllRead = async () => {
    try {
      await Promise.all(notifications.map((notification) => handleMarkAsRead({ notificationUuid: notification?.uuid })));
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      toast({
        description: "Failed to mark all as read",
        variant: "error",
      });

    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative m-2 cursor-pointer">
          <Bell className="h-7 w-7"/>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-1 h-4 w-4 rounded-full bg-secondary_color text-center text-xs font-bold text-text_color_light flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px] md:w-80">
        <Card className="border-none">
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification?.uuid}
                  className="flex items-start space-x-4 cursor-pointer"
                  onClick= {()=>handleNotificationClick(notification?.blogUuid, notification?.uuid)} // Routes to the "Blog details page"
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                  <div className="flex-1 space-y-1">
                    {notification?.type === "comment" ? (
                      <p>You have a new Comment from {notification?.byUsername}</p>
                    ) : (
                      <p>You have a new Reply Comment from {notification?.byUsername}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="link"
              className="w-full mt-4 text-secondary_color"
              onClick={() => markAllRead()}
            >
              Mark all as read
            </Button>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}