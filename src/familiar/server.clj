(ns familiar.server
  (:require [compojure.route :as route]
            [compojure.core :refer :all]
            [ring.adapter.jetty :refer :all]
            [familiar.db :refer :all]))

(defroutes main-routes 
  ; api endpoints here
  (GET "/api/variables" [] (json-vars))
  (route/resources "/"))

(defn start-server 
  []
  (run-jetty main-routes {:port 3000}))
  
