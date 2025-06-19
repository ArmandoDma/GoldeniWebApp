import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("./Auth/Layout.tsx", [
        route("login", "routes/login.tsx"),
    ]),
    layout("./Views/LayoutViews.tsx", [        
        //students routes
        route("students/portal", "routes/studentsPortal.tsx"),
        route("students/courses","views/Alumn/Courses.tsx"),
        route("students/grades", "views/Alumn/Grades.tsx"),
        route("students/schedule", "views/Alumn/Schedule.tsx"),
        route("students/workshops","views/Alumn/Workshops.tsx"),
        route("students/events", "views/Alumn/Eventos.tsx"),
        route("students/attend", "views/Alumn/Attend.tsx"),
        route("students/profile", "views/Alumn/Profile.tsx"),

        route("teachers/portal", "routes/teachersPortal.tsx"),
    ])
] satisfies RouteConfig;
