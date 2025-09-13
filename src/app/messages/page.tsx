"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { messages, conversation } from "@/lib/placeholder-data";
import { placeHolderImages } from "@/lib/placeholder-images";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(messages[0]);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm grid md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col border-r md:col-span-1">
          <div className="p-4">
            <h1 className="text-2xl font-bold tracking-tight font-headline">
              Messages
            </h1>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-2">
              {messages.map((msg) => {
                const image = placeHolderImages.find(
                  (img) => img.id === msg.imageId
                );
                return (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedConversation(msg)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-secondary",
                      selectedConversation.id === msg.id && "bg-secondary"
                    )}
                  >
                    <Avatar className="h-10 w-10">
                      {image && (
                        <AvatarImage src={image.imageUrl} alt={msg.sender} />
                      )}
                      <AvatarFallback>
                        {msg.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-baseline justify-between">
                        <p className="font-semibold truncate">{msg.sender}</p>
                        <p className="text-xs text-muted-foreground">
                          {msg.timestamp}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {msg.lastMessage}
                        </p>
                        {msg.unreadCount > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {msg.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-4 border-b p-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  placeHolderImages.find(
                    (img) => img.id === selectedConversation.imageId
                  )?.imageUrl
                }
                alt={selectedConversation.sender}
              />
              <AvatarFallback>
                {selectedConversation.sender.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">
              {selectedConversation.sender}
            </h2>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {conversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end gap-2",
                    msg.type === "sent" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs rounded-lg p-3 md:max-w-md",
                      msg.type === "sent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="relative">
              <Input
                placeholder="Type a message..."
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              >
                <Send className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
