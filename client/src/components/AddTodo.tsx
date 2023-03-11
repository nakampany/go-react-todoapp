import React from "react";
import {useState} from "react";
import { useForm } from '@mantine/form';
import {Button, Group, Modal, TextInput, Textarea} from "@mantine/core";
import { KeyedMutator } from "swr";
import { ENDPOINT, Todo } from "../App";


const AddTodo = ({mutate}: {mutate: KeyedMutator<Todo[]>}) => {

    const [open, setOpen] = useState(false);
    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        },
    });

    async function createTodo(value: string, body: string) {
        const update = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value)}).then((res) => res.json());
        mutate(update);
        form.reset();
        setOpen(false);

        };
        

    return (

        <>
            <Modal opened={open} onClose={() => setOpen(false)} title="Create Todo">
                <form action="" onSubmit={form.onSubmit(createTodo)}>
                    <TextInput required mb={12} label="Todo" placeholder="やるべきこと" {...form.getInputProps("title")}/>
                    <Textarea required mb={12} label="Body" placeholder="詳細" {...form.getInputProps("body")}/>

                    <Button type="submit">create todo</Button>
                </form>
            </Modal>
            <Group position="center">
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                    Add Todo
                </Button>
            </Group>
        </>
    );
};

export default AddTodo;
