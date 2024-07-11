"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { products } from '@/app/lib/placeholder-data';
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  // const [products, setProducts] = useState<Array<Schema["Product"]["type"]>>([]);
  // const products = async products();
  // const fetchProducts = async () => {
  //   const { data: products, errors } = await client.models.Product.list();
  //   setProducts(products);
  // };
  function listProducts() {
    client.models.Product.list();
  }

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function deleteTodos(id: string) {
    client.models.Todo.delete({ id })
  }

  useEffect(() => {
    listTodos();
    listProducts();
    // fetchProducts();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
      isDone: false,
    });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.subtitle}</p>
                <p>Brand: {product.brand}</p>
                <h3>Reviews</h3>
                <ul>
                  {product.reviews.map((review, index) => (
                    <li key={index}>
                      <p>Customer: {review.customer}</p>
                      <p>Review: {review.review}</p>
                      <p>Score: {review.score}</p>
                    </li>
                  ))}
                </ul>
              </li>
              // <img src={product.title} />
                // <li key={product.id}>{product.image}</li>
            ))}

          </ul>

          {/* <ul>
            {todos.map((todo) => (
              <li onClick={() => deleteTodos(todo.id)} key={todo.id}>{todo.content}</li>
            ))}
          </ul> */}
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
              Review next steps of this tutorial.
            </a>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
