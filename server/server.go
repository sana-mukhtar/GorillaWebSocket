package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func handlerFunc(w http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		log.Println(err)
	}

	for {
		msgType, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("err readMessage: ", err)
			break
		}

		if err := conn.WriteMessage(msgType, msg); err != nil {
			log.Println("err writeMessage: ", err)
			break
		}
	}
}

func main() {
	http.HandleFunc("/ws", handlerFunc)
	addr := ":8080"
	http.ListenAndServe(addr, nil)
}
