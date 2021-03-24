// 双向链表
class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}
class DbList {
  constructor(){
    this.size = 0
    this.head = new Node('head')
    this.curNode = ''
  }
   // 获取链表长度
  getLength() {
    return this.size
  }
  // 判断单链表是否为空
  isEmpty() {
    return this.size === 0;
  }
   // 查询
  find(item) {
    let curNode = this.head
    while(curNode && curNode.data!==item) {
      curNode = curNode.next
    }
    return curNode
  }
  // 找到具体某一项的前一项
  findPrev(item) {
    let curNode = this.head
    while(curNode.next!==null && curNode.next.data!== item) {
      curNode = curNode.next
    }
    return curNode
  }
   // 获取单链表的最后一个节点
   findLast() {
    let curNode = this.head
    while(curNode.next) {
      curNode = curNode.next
    }
    return curNode
  }
  // 清空单链表
  clear() {
    this.head.next = null
    this.size = 0
  }
   // 单链表的遍历显示
  display() {
    let result = ''
    let curNode = this.head
    while (curNode) {
      result += curNode.data
      curNode = curNode.next
      if(curNode) {
        result += '->'
      }
    }
    console.log(result)
  }
  // 从当前节点向前移动n个位置
  advance(n, curNode = this.head) {
    this.curNode = curNode
    while (n && this.curNode.next) {
      this.curNode = this.curNode.next
      n--
    }
    return this.curNode
  }
  // 在item后添加newElement
  insert(item, newElement) {
    let curNode = this.find(item)
    let newNode = new Node(newElement)

    if (curNode.next) { // 插入的位置在中间
      newNode.next = curNode.next
      curNode.next.prev = newNode
      curNode.next = newNode
      newNode.prev = curNode
    } else { // 插入的位置在尾部
      curNode.next = newNode
      newNode.prev = curNode
    }
    this.size++
  }
  // 从双向链表中移除item节点
  remove(item) {
    let curNode = this.find(item);
    let lastNode = this.findLast();
    
    // 删除头节点
    if(item === 'head') {
      this.head.next = null
      this.head.prev = null
      this.size = 0
      return
    }

    if(curNode) { // 如果存在item节点
      if(curNode == lastNode) { // item为最后一个节点
        curNode.prev.next = null
      } else {
        curNode.prev.next = curNode.next
        curNode.next.prev = curNode.prev
      }
      this.size--
    }
  }
}

let test = new DbList();

test.insert('head', 1);
test.insert(1, 2);
test.insert(2, 3);
test.insert(3, 4);
test.display();  // head->1->2->3->4

// 删除最后一个节点 
test.remove(4); 
test.display();  // head->1->2->3

// 删除中间的节点
test.remove(2);
test.display();  // head->1->3

// 清空链表
test.remove('head');
test.display();  // head