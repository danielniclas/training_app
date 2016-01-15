'use strict';

/* Controllers */

angular.module('7minWorkout')           //  GET an EXISTING module  -- retrieve the '7minworkout' module
                                        //  Now DECLARE our CONTROLLER and REGISTER it

    .controller('WorkoutController', ['$scope', '$interval', '$location', function ($scope, $interval, $location) {

        //  CONTROLLER METHOD takes 2 Args:  Arg 1:  controller name  Arg 2:  constructor function for the controller:
        //  ['$scope', function ($scope) {  } ]
        //  Our implementation goes inside of this controller:

        //  All names starting with $ are constructs EXPOSED by the framework
        // $scope is an OBJECT
        // $interval is an ANGULAR SERVICE and needs to be injected at the CONTROLLER

        //  $scope provides a METHOD called $watch   $scope.$watch(watchExpression, [listener], [objectEquality])
        //  If the 'watchExpression' value changes, the listener is invoked
        //  Listener is invoked with three parameters:  newValue, oldValue and the current scope.
        //  objectEquality is a Boolean argument - set to TRUE or FALSE

        //  $location service  --  Use $location service to transition to "finish Page"




        //  Define MODEL:

                                                //  WORKOUTPLAN MODEL
        function WorkoutPlan(args) {            //  CONSTRUCTOR FUNCTION #1: CREATE WorkoutPlan OBJECT  << OBJECT PASSED HERE
            this.exercises = [];                //  workout OBJECT :  {exercises:  name:  title:  restBetweenExercise: }
            this.name = args.name;              //  workout.exercises = []  workout.name = OBJECT.name , etc.
            this.title = args.title;
            this.restBetweenExercise = args.restBetweenExercise;
            this.bones = args.bones;

            this.totalWorkoutDuration = function () {
                if (this.exercises.length == 0) return 0;
                var total = 0;
                angular.forEach(this.exercises, function (exercise) {
                    total = total + exercise.duration;
                });
                return this.restBetweenExercise * (this.exercises.length - 1) + total;
            }
        }

                                                    //  EXERCISE MODEL
        function Exercise(args) {                   //  CONSTRUCTOR FUNCTION #2 CREATE Exercise OBJECT
            this.name = args.name;
            this.title = args.title;
            this.description = args.description;
            this.image = args.image;
            this.related = {};
            this.related.videos = args.videos;
            this.nameSound = args.nameSound;
            this.procedure = args.procedure;
        }

        var restExercise;
        //var workoutPlan;


        var startWorkout = function () {                        //  <<  START  <<<<

            $scope.workoutPlan = createWorkout();               //  1. createWorkout()  --  RETURN 'workout' variable from below

            console.log("workout.exercises:  ");
            console.log($scope.workoutPlan);


            $scope.workoutTimeRemaining = $scope.workoutPlan.totalWorkoutDuration();

            restExercise = {
                details: new Exercise({
                    name: "rest",
                    title: "Relax!",
                    description: "Relax a bit!",
                    image: "img/rest.png"
                }),
                duration: $scope.workoutPlan.restBetweenExercise
            };

            $interval(function () {               //  $interval ANGULAR SERVICE  $interval(1. callback, 2. ms, 3. specific number of times)
                                                  //  $interval SERVICE is a wrapper over teh window.setInterval method
                                                  //  Purpose:  Call a specific function continuously at specific intervals
                $scope.workoutTimeRemaining = $scope.workoutTimeRemaining - 1;
            }, 1000, $scope.workoutTimeRemaining);



            startExercise($scope.workoutPlan.exercises.shift());        //  .shift() --  remove first exercise from the exercises ARRAY []
        };                                       //  END startWorkout FUNCTION



              $scope.promises = 0;                          //  PROMISES  PROMISES

        var startExercise = function (exercisePlan) {
            $scope.currentExercise = exercisePlan;
            $scope.currentExerciseDuration = 0;

            $interval(function () {                         //  Asynchronous METHOD $interval -- RETURNS a PROMISE
                ++$scope.currentExerciseDuration;           //  PROMISE is RESOLVED after $interval service invokes callback METHOD (first arg)
            }, 1000, $scope.currentExercise.duration)       //  >>  returns a PROMISE

                .then(function () {                         //  then() METHOD of the PROMISE API
                                                            //  then CALLBACK FUNCTION

                    $scope.promises ++;

                    var next = getNextExercise(exercisePlan);
                    if (next) {
                        startExercise(next);
                    }
                    else {
                        console.log("Workout complete!");
                        $location.path('/finish');          //  $location service  --  $location.path()
                    }
                });

        };


        var getNextExercise = function (currentExercisePlan) {
            var nextExercise = null;
            if (currentExercisePlan === restExercise) {
                nextExercise = $scope.workoutPlan.exercises.shift();
            }
            else {
                if ($scope.workoutPlan.exercises.length != 0) {
                    nextExercise = restExercise;
                }
            }
            return nextExercise;
        };

        //$scope.$watch('currentExerciseDuration', function (nVal) {
        //    if (nVal == $scope.currentExercise.duration) {
        //        var next = getNextExercise($scope.currentExercise);
        //        if (next) {
        //            startExercise(next);
        //        } else {
        //            console.log("Workout complete!")
        //        }
        //    }
        //});

        var workoutObject = {                          //  OBJECT to pass into the CONSTRUCTOR FUNCTION
            name: "7minWorkout",                       //  ENTIRE OBJECT is passed as the 'args' to CONSTRUCTOR FUNCTION (see above)
            title: "7 Minute Workout",
            restBetweenExercise: 10,
            bones: "crunchy"
        };


        var createWorkout = function () {
            var workout = new WorkoutPlan(           //  CREATE New OBJECT named:  workout

            workoutObject                            //  ENTIRE OBJECT is passed as the 'args' to CONSTRUCTOR FUNCTION (see above)

            );


            console.log("XXX: ");
            console.log(workout);

            //  FILL UP THE exercises[] array with push()
            //  Now function continues to push() each exercise OBJECTS into the exercises[] ARRAY

            workout.exercises.push({
                details: new Exercise({             //  PASSING ENTIRE OBJECT to Exercise CONSTRUCTOR FUNCTION (above)
                    name: "jumpingJacks",
                    title: "Jumping Jacks",
                    description: "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
                    image: "img/JumpingJacks.png",
                    videos: ["//www.youtube.com/embed/dmYwZH_BNd0", "//www.youtube.com/embed/BABOdJ-2Z6o", "//www.youtube.com/embed/c4DAnQ6DtF8"],
                    procedure: "Assume an erect position, with feet together and arms at your side.\
                            Slightly bend your knees, and propel yourself a few inches into the air.\
                            While in air, bring your legs out to the side about shoulder width or slightly wider.\
                            As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.\
                            Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent"
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "wallSit",
                    title: "Wall Sit",
                    description: "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
                    image: "img/wallsit.png",
                    videos: ["//www.youtube.com/embed/y-wV4Venusw", "//www.youtube.com/embed/MMV3v4ap4ro"],
                    procedure: "Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.\
                              Then, keeping your back against the wall, lower your hips until your knees form right angles. "
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "pushUp",
                    title: "Push Up",
                    description: "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
                    image: "img/Pushup.png",
                    videos: ["//www.youtube.com/embed/Eh00_rniF8E", "//www.youtube.com/embed/ZWdBqFLNljc", "//www.youtube.com/embed/UwRLWMcOdwI", "//www.youtube.com/embed/ynPwl6qyUNM", "//www.youtube.com/embed/OicNTT2xzMI"],
                    procedure: "Lie prone on the ground with hands placed as wide or slightly wider than shoulder width. \
                              Keeping the body straight, lower body to the ground by bending arms at the elbows. \
                              Raise body up off the ground by extending the arms."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "crunches",
                    title: "Abdominal Crunches",
                    description: "The basic crunch is a abdominal exercise in a strength-training program.",
                    image: "img/crunches.png",
                    videos: ["//www.youtube.com/embed/Xyd_fa5zoEU", "//www.youtube.com/embed/MKmrqcoCZ-M"],
                    procedure: "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.\
                              Place your hands behind your head so your thumbs are behind your ears.\
                              Hold your elbows out to the sides but rounded slightly in.\
                              Gently pull your abdominals inward.\
                              Curl up and forward so that your head, neck, and shoulder blades lift off the floor.\
                              Hold for a moment at the top of the movement and then lower slowly back down."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "stepUpOntoChair",
                    title: "Step Up Onto Chair",
                    description: "Step exercises are ideal for building muscle in your lower body.",
                    image: "img/stepUpOntoChair.jpg",
                    videos: ["//www.youtube.com/embed/aajhW7DD1EA"],
                    procedure: "Position your chair in front of you.\
                              Stand with your feet about hip width apart, arms at your sides.\
                              Step up onto the seat with one foot, pressing down while bringing your other foot up next to it. \
                              Step back with the leading foot and bring the trailing foot down to finish one step-up."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "squat",
                    title: "Squat",
                    description: "The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips, buttocks and quads.",
                    image: "img/squat.png",
                    videos: ["//www.youtube.com/embed/QKKZ9AGYTi4", "//www.youtube.com/embed/UXJrBgI2RxA"],
                    procedure: "Stand with your head facing forward and your chest held up and out.\
                              Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.\
                              Sit back and down like you're sitting into a chair. Keep your head facing straight as your upper body bends forward a bit. Rather than allowing your back to round, let your lower back arch slightly as you go down.\
                              Lower down so your thighs are parallel to the floor, with your knees over your ankles. Press your weight back into your heels.\
                              Keep your body tight, and push through your heels to bring yourself back to the starting position."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "tricepdips",
                    title: "Tricep Dips On Chair",
                    description: "A body weight exercise that targets triceps.",
                    image: "img/tricepdips.jpg",
                    videos: ["//www.youtube.com/embed/tKjcgfu44sI", "//www.youtube.com/embed/jox1rb5krQI"],
                    procedure: "Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.\
                              Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.\
                              Without moving your legs, bring your glutes forward off the chair.\
                              Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "plank",
                    title: "Plank",
                    description: "The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a difficult position for extended periods of time. ",
                    image: "img/Plank.png",
                    videos: ["//www.youtube.com/embed/pSHjTRCQxIw", "//www.youtube.com/embed/TvxNkmjdhMM"],
                    procedure: "Get into pushup position on the floor.\
                              Bend your elbows 90 degrees and rest your weight on your forearms.\
                              Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.\
                              Hold this position."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "highKnees",
                    title: "High Knees",
                    description: "A form exercise that develops strength and endurance of the hip flexors and quads and stretches the hip extensors.",
                    image: "img/highknees.png",
                    videos: ["//www.youtube.com/embed/OAJ_J3EZkdY", "//www.youtube.com/embed/8opcQdC-V-U"],
                    procedure: "Start standing with feet hip-width apart. \
                              Do inplace jog with your knees lifting as much as possible towards your chest."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "lunges",
                    title: "Lunges",
                    description: "Lunges are a good exercise for strengthening, sculpting and building several muscles/muscle groups, including the quadriceps (or thighs), the gluteus maximus (or buttocks) as well as the hamstrings. ",
                    image: "img/lunges.png",
                    videos: ["//www.youtube.com/embed/Z2n58m2i4jg"],
                    procedure: "Stand erect with your feet about one shoulder width apart.\
                              Put your hands on your hips, keep your back as straight as possible, relax your shoulders and keep your eyes facing directly ahead.\
                              Take a large step forward with one leg.\
                              As you step forward, lower your hips and bend your knees until they both form 90 degree angles.\
                              Return to starting position.\
                              Repeat with your alternate leg."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "pushupNRotate",
                    title: "Pushup And Rotate",
                    description: "A variation of pushup that requires you to rotate.",
                    image: "img/pushupNRotate.jpg",
                    videos: ["//www.youtube.com/embed/qHQ_E-f5278"],
                    procedure: "Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.\
                              Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling."
                }),
                duration: 30
            });
            workout.exercises.push({
                details: new Exercise({
                    name: "sidePlank",
                    title: "Side Plank",
                    description: "A variation to Plank done using one hand only",
                    image: "img/sideplank.png",
                    videos: ["//www.youtube.com/embed/wqzrb67Dwf8", "//www.youtube.com/embed/_rdfjFSFKMY"],
                    procedure: "Lie on your side, in a straight line from head to feet, resting on your forearm.\
                              Your elbow should be directly under your shoulder.\
                              With your abdominals gently contracted, lift your hips off the floor, maintaining the line.\
                              Keep your hips square and your neck in line with your spine. Hold the position."
                }),
                duration: 30
            });

            console.log("XXX After: ");
            console.log(workout);


            return workout;
        };


        var init = function () {
            startWorkout();             //  >>  START
        };

        init();                         //  >>  START  >>  Where CONTROLLER EXECUTION STARTS
    }]);