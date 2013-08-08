(ns familiar.server
  (:require [compojure.route :as route]
            [compojure.core :refer :all]
            [ring.adapter.jetty :refer :all]))

(defroutes main-routes 
  ; api endpoints here
  (route/resources "/"))

(defn start-server 
  []
  (run-jetty main-routes {:port 3000}))
  
