import React from "react";
import {useState} from "react";
import { useForm } from '@mantine/form';
import {Button, Group, Modal, TextInput, Textarea} from "@mantine/core";

const AddTodo = () => {

    const [open, setOpen] = useState(false);
    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        },
    });

    function createTodo() {

    }

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
