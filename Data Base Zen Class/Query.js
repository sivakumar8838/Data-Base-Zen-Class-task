
// Queries for all questions :

// 1 . Find all the topics and tasks which are thought in the month of October

        // query :

        db.topics.aggregate([
            {
                $match: {
                $or: [
                    { start_date: { $gte: "2023-10-01", $lte: "2023-10-30" } },
                    { end_date: { $gte: "2023-10-01", $lte: "2023-10-30" } }
                ]
                }
            },
            {
                $lookup: {
                from: "tasks",
                localField: "topic_id",
                foreignField: "user_id",
                as: "tasks_info"
                }
            },
            {
                $project: {
                _id: 0,
                topic_name: 1,
                description: 1,
                start_date: 1,
                end_date: 1,
                "tasks_info.task_name": 1,
                "tasks_info.submission_date": 1
                }
            }
            ]);


// 2 . Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

        // query :

                db.company_drives.aggregate([
                {
                    $match: {
                    $and: [
                        { drive_date: { $gte: "2020-10-15" } },
                        { drive_date: { $lte: "2020-10-31" } }
                    ]
                    }
                },
                {
                    $project: {
                    _id: 0,
                    drive_id: 1,
                    company_name: 1,
                    drive_date: 1,
                    drive_type: 1,
                    location: 1
                    }
                }
                ]); 


// 3 . Find all the company drives and students who are appeared for the placement.

        // query :

                db.company_drives.find({status:"Appeared"});


// 4 . Find the number of problems solved by the user in codekata

        // query : 

                db.codekata.find().forEach(function(doc) {
                print("User ID: " + doc.user_id + ", Total Problems Solved: " + doc.total_problems_solved);
                });


// 5 . Find all the mentors with who has the mentee's count more than 15

        // query :

                db.mentor.find().forEach(doc => {
                if (doc.mentee_count >= 15) {
                    print("Mentor Name: " + doc.mentor_name + ", Mentees Count: " + doc.mentee_count);
                }
                });


// 6 . Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

        // query :

                db.tasks.aggregate([
                {
                    $lookup: {
                    from: "attendance",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "attendance_info"
                    }
                },
                {
                    $project: {
                    _id:0,
                    user_id: 1,
                    task_name: 1,
                    submission_date: 1,
                    attendance_status: "$attendance_info.status",
                    attendance_reason: "$attendance_info.reason"
                    }
                }
                ]);