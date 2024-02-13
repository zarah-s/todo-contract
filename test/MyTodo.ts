import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyTodo", function () {

  async function deployMyTodo() {

    const MyTodo = await ethers.getContractFactory("MyTodo");
    const myTodo = await MyTodo.deploy();

    return myTodo;
  }

  describe("Create Todo", function () {
    it("Should create a new todo", async function () {
      const myTodo = await loadFixture(deployMyTodo);
      await myTodo.createTodo("code", "Code");
      const todos = await myTodo.getTodos()
      expect(todos).with.lengthOf(1);
      expect(todos[0][0]).eq(1);
      expect(todos[0][1]).eq("code");
      expect(todos[0][2]).eq("Code");
      expect(todos[0][4]).eq(0);
    });


  });


  describe("Update Todo Status", function () {
    it("Should update status", async function () {
      const myTodo = await loadFixture(deployMyTodo);
      await myTodo.createTodo("code", "Code");
      await myTodo.updateStatus(1, 1);
      const todos = await myTodo.getTodos();
      const singleTodo = todos[0];
      expect(singleTodo[4]).eq(1);

    });


  });


  describe("Delete Todo", function () {
    it("Should delete todo", async function () {
      const myTodo = await loadFixture(deployMyTodo);
      await myTodo.createTodo("code", "Code");
      await myTodo.deleteTodo(1);
      const todos = await myTodo.getTodos();
      console.log(todos);
      expect(todos).with.lengthOf(0);

      // expect(todos[0][0]).eq(0);
      // expect(todos[0][1]).eq(0);
      // expect(todos[0][2]).eq(0);
      // expect(todos[0][4]).eq(0);

    });


  });


});
