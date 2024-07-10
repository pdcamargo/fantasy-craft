"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@craft/ui";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@craft/ui/command";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Jutsu } from "app/dashboard/n5e/utils/jutsu-database";

export type JutsuSelectProps = {
  jutsus: Jutsu[];
  onJutsuSelect?: (jutsu: string) => void;
  heading?: string;
};

export const JutsuSelect = NiceModal.create(
  ({ jutsus, onJutsuSelect, heading }: JutsuSelectProps) => {
    const modal = useModal(JutsuSelect);

    const groupedJutsus = Object.groupBy(jutsus, (item) => item.type);

    const jutsuTabs = Object.entries(groupedJutsus);

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            modal.hide();
            return;
          }

          modal.show();
        }}
      >
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Jutsu Select ({heading})</DialogTitle>
            </DialogHeader>
            <Tabs>
              <TabsList>
                {jutsuTabs.map(([type]) => (
                  <TabsTrigger key={type} value={type}>
                    {type.replace("Jutsu", "").trim()}
                  </TabsTrigger>
                ))}
              </TabsList>
              {jutsuTabs.map(([type, jutsus], idx) => (
                <TabsContent key={idx} value={type}>
                  <Command>
                    <CommandInput placeholder="Search for a jutsu" />
                    <CommandList>
                      <CommandEmpty>No jutsus found</CommandEmpty>
                      <CommandGroup>
                        {jutsus?.map((jutsu) => (
                          <CommandItem
                            key={jutsu.name}
                            onSelect={(value) => {
                              onJutsuSelect?.(value);
                            }}
                          >
                            {jutsu.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </TabsContent>
              ))}
            </Tabs>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  },
);

export const useJutsuSelect = () => useModal(JutsuSelect);
