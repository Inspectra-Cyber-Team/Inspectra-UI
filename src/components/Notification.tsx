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
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "./ui/skeleton";



export function Notification() {



  const {toast} = useToast();

  const [userUuid, setUserUuid] = React.useState("");
  const [unreadCount, setUnreadCount] = React.useState(0);

  // get uuid user from localstorage
  React.useEffect(() => {
    const storedUUID = localStorage.getItem("userUUID") ?? "";
    setUserUuid(storedUUID);
  },[]);

  const router = useRouter();

  // calling notification data 
  const {data, isLoading} = useGetAllNotificationQuery({page:0,size:25});
  

  // calling function mark  as read

  const [handleMarkAsRead] = useMarkAsReadMutation();

  const [notifications, setNotifications] = React.useState<NotificationType[]>([]);

  React.useEffect(() => {
    if(data){
      setNotifications(data?.content || []);
    }
  }, [data]);

  React.useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  const [socket, setSocket] = React.useState<WebSocket | null>(null);

   const receivedUuidsRef = React.useRef<Set<string>>(new Set()); 

   // Ensure userUuid is available before trying to connect WebSocket
React.useEffect(() => {
  if (userUuid) {
    const connectWebSocket = () => {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);

      ws.onopen = () => {
        console.log("WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        try {
          const newComment = JSON.parse(event.data);

          // Ensure userUuid is available
          if (!userUuid) {
            return;
          }

          // Check if the message has the right structure and belongs to the current user
          if (newComment?.data?.uuid && newComment?.data?.ownerUserUuid === userUuid) {

            
            if (
              (newComment.event === "new-comment" ||
                newComment.event === "new-reply" ||
                newComment.event === "like") &&
              !receivedUuidsRef.current.has(newComment?.data?.uuid)
            ) {
     
             
              setNotifications((prevData) => [newComment.data, ...prevData]);
              receivedUuidsRef.current.add(newComment?.data?.uuid);
            }
          
            else if (newComment?.event === "mark-read" && newComment?.data?.ownerUserUuid === userUuid) {
     
              setNotifications((prevData) =>
                prevData.filter((notification) => notification.uuid !== newComment?.data?.uuid)
              );
              receivedUuidsRef.current.delete(newComment.data.uuid);
              setUnreadCount((prevCount) => prevCount - 1);
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = () => console.error("WebSocket error occurred.");
      ws.onclose = () => console.log("WebSocket closed.");

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      socket?.close();
    };
  } 
}, [userUuid]); // Trigger when userUuid changes


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

  if (isLoading) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative m-2 cursor-pointer">
            <Bell className="h-7 w-7" />
            <Skeleton className="absolute -top-2 -right-1 h-4 w-4 rounded-full" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[250px] md:w-80">
          <Card className="border-none">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Notifications</h3>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <Skeleton className="h-2 w-2 mt-2 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="w-full h-9 mt-4" />
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    )
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
  
          
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification?.uuid}
                className="flex items-start space-x-4 cursor-pointer"
                onClick={() => handleNotificationClick(notification?.blogUuid, notification?.uuid)} // Routes to the "Blog details page"
              >
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                <div className="flex-1 space-y-1">
                {(() => {
                  if (notification?.type === "comment") {
                    return <p>You have a new Comment from {notification?.byUsername}</p>;
                  } else if (notification?.type === "reply") {
                    return <p>You have a new Reply Comment from {notification?.byUsername}</p>;
                  } else if (notification?.type === "like") {
                    return <p>Your blog has been liked by {notification?.byUsername}</p>;
                  } else {
                    return null;
                  }
                })()}

                  <p className="text-xs text-text_color_light">
                    {notification?.createdAt
                      ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
                      : "Just now"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No new notifications.</p>
          )}
         
       
            </div>  
            {notifications.length > 0 && (

                <Button
              variant="link"
              className="w-full mt-4 text-secondary_color"
              onClick={() => markAllRead()}
            >
              Mark all as read
            </Button>
              )}
         
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}