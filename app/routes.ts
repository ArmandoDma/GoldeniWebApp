import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("./Auth/Layout.tsx", [
        route("login", "routes/login.tsx"),
    ]),
    layout("./Views/LayoutViews.tsx", [        
        //students routes
        route("students/portal", "routes/studentsPortal.tsx"),
        route("students/courses","views/Courses.tsx"),
        route("students/grades", "views/Grades.tsx"),
        route("students/schedule", "views/Schedule.tsx"),
        route("students/workshops","views/Workshops.tsx"),
        route("students/events", "views/Eventos.tsx"),
        route("students/attend", "views/Attend.tsx"),
        route("students/profile", "views/profile/Profile.tsx"),

        route("teachers/portal", "routes/teachersPortal.tsx"),
    ])
] satisfies RouteConfig;
