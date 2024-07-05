import { N5eCharacter } from "@craft/query";
import { useTranslation } from "@craft/translation";
import {
  Button,
  Label,
  Input,
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@craft/ui";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@craft/ui/sheet";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import clans from "app/dashboard/n5e/data/clans.json";

export type CharacterManagerSheetProps = {
  character: N5eCharacter;
};

const characterEditSchema = z.object({
  name: z.string().default(""),
  clan: z.string().default(""),
});

type CharacterEditSchema = z.infer<typeof characterEditSchema>;

export const CharacterManagerSheet = NiceModal.create(
  ({ character }: CharacterManagerSheetProps) => {
    const modal = useModal(CharacterManagerSheet);

    const form = useForm<CharacterEditSchema>({
      resolver: zodResolver(characterEditSchema),
      defaultValues: {
        name: character.name,
        clan: character.clan,
      },
    });

    const onSubmit = async (data: CharacterEditSchema) => {
      console.log(data);
    };

    return (
      <Sheet
        open={modal.visible}
        onOpenChange={(open) => {
          if (!open) {
            modal.hide();
          }
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Character</SheetTitle>
            <SheetDescription>
              Make changes to your character here. Click save or press enter
              when you're done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="edit-character-manager"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Character Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clan"
                render={({ field: { ref, ...field } }) => (
                  <FormItem>
                    <FormLabel>Clan</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a clan" />
                        </SelectTrigger>
                        <SelectContent ref={ref}>
                          <SelectGroup>
                            <SelectLabel>Clans</SelectLabel>

                            {clans.map((clan) => (
                              <SelectItem key={clan} value={clan}>
                                {clan}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <SheetFooter>
            <Button type="submit" form="edit-character-manager">
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
);

export const useCharacterManagerSheet = () => useModal(CharacterManagerSheet);
