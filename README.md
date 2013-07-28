<img src="http://oi40.tinypic.com/20tqal5.jpg"
 alt="Symbolism!" title= "Symbolism!" align="middle" /> 

_We sometimes underestimate the influence of little things._
--Charles W. Chesnutt

Familiar
========
Familiar will be a quantified reasoning assistant--a tool for those who want to improve their [inevitably imperfect thinking](http://en.wikipedia.org/wiki/List_of_cognitive_biases) regarding whatever it is they care about using [_SCIENCE_](http://en.wikipedia.org/wiki/Machine_learning).

Goals
-----
* A convenient UI for entering data and describing possible models on that data
* Automated predicate and network building/checking to thoroughly explore the space of possible models on your data (this is NP-complete, may take a while...)
* Guided experimentation to more accurately determine relationships between variables of interest and filter out spurious correlations
* Data collection from various Quantified Self apps/devices and other web services via API
* Fun pictures of personally relevant Bayes nets for you to look at
* Better Living Through Numbers

A Warning
---------
This is **pre-alpha software**, released primarily as a thought-provoking toy for Quantified Self enthusiasts and other nerds. For the foreseeable future, Familiar should only be seriously used by those with high confidence in their probability and statistics knowledge who have _read the source code_ and _understand exactly what's going on_. I'm in no way responsible for anything good or bad that happens as a result of you considering the output that Familiar presents you with as evidence of anything. Trust my math at your own risk!

For many imaginable uses of Familiar, improving your [mindfulness](http://en.wikipedia.org/wiki/Mindfulness_%28psychology%29) or [luminosity](http://lesswrong.com/lw/1xh/living_luminously/) would be a much faster and more effective way to accomplish your goal.

Installation
------------
Easier, more limited usage:
* Download and run the most recent [release](https://github.com/jferg/familiar/releases)

More advanced usage:
* Download this repository
* Install [Leiningen](https://github.com/technomancy/leiningen)
* `lein repl` from within the `familiar-master` directory

Basic usage
-----------
* Define variables you'd like to measure. By default, variables are defined with a time resolution of one day.

```clojure
;; format: new-var name domain default options
(new-var tiredness #{0 1 2} 1 :unit "subjective rating (higher = more tired)")

(new-var sleep non-negative? 7 :unit "hours last night")

(new-var coffee non-negative? 1 :unit "cups")

(new-var exercise boolean? false)
```

* Collect data on those variables.

```clojure
(data tiredness 1 sleep 7 coffee 1 exercise true)
;; wait a day
(data tiredness 2 sleep 6 coffee 0 exercise false)
;; wait a day
(data tiredness 0 sleep 8)
(defaults coffee exercise)
;; if you want to enter data for a day after that day has passed,
(change-time (days -1))
(data tiredness 1 exercise true sleep 7 coffee 0)
;; etc.
```

* Define predicates on your variables if you think they're more likely to give you useful information than raw data. Defining one or more predicates for every non-binary-valued variable that sorts it into "over some value" and "under some value" buckets may be a good idea. Predicates are Clojure functions that expect a single argument, representing a time.

```clojure
(new-pred enough-sleep
  (fn [t] (>= (value sleep t) 7)))

(new-pred coffee-yesterday
  #(pos? (value coffee (minus % (days 1)))))

(new-pred regular-exercise
  #(and (value exercise (minus % (days 1)))
        (value exercise (minus % (days 2)))
        (value exercise (minus % (days 3)))))

;; or perhaps more Clojurely,
(new-pred regular-exercise
  (fn [t]
    (every? true?
    (map #(value exercise (minus t (days %)))
         (range 1 4)))))
```

* After collecting lots of data, see what correlations turn up.

```clojure
(correlations tiredness 0)
=> ({{"coffee-yesterday" "false"} 0.8351}
    {{"enough-sleep" "true"} 0.7625}
    {{"regular-exercise" "true"} 0.7128}
    {{"sleep" "8"} 0.6736}
    {{"coffee" "1"} 0.6500}
    {{"exercise" "true"} 0.5912})
;; interpretation: not drinking coffee the day before, getting at least 7 hours
;; of sleep the night before, and exercising every day for three days prior are
;; the strongest predictors of feeling well-rested on any given day, out of all
;; the variables and predicates that have been defined.
```

Contact
-------
If you think you might have anything to contribute to Familiar, whether in the form of code, advice, bug reports, usability feedback, reading recommendations, vitriol, or crayon drawings, contact me at [my github username]uson2.718 at gmail.com, or [@jsfergalicious](https://twitter.com/jsfergalicious).

License
-------
Crafted with the loving assistance of the fine facilitators, students, and residents at [Hacker School](https://www.hackerschool.com/). If you like programming you should stop doing everything else and apply there [_right now_](https://www.hackerschool.com/apply).

Copyright (C) 2013 James Ferguson

Distributed under the Eclipse Public License, the same as Clojure.
