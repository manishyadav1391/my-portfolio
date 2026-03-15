export type Project = {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'Driver Drowsiness Detection System',
    description:
      'AI-based computer vision system that detects driver fatigue using webcam input. Uses OpenCV to monitor eye closure and trigger an alert when drowsiness is detected to prevent accidents.',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'AI'],
    githubUrl: 'https://github.com/manishyadav1391/Driver-drowsiness',
    featured: true,
  },
  {
    title: 'Weather App',
    description:
      'Simple weather application that fetches real-time weather data using an API and displays temperature and conditions in a clean UI.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Weather API'],
    githubUrl: 'https://github.com/manishyadav1391/WeatherApp',
    featured: false,
  },
  {
    title: 'Parent Alert System',
    description:
      'Notification system designed to send alerts to parents for monitoring and safety purposes. Built as a project exploring automation and notification systems.',
    tags: ['Python', 'Automation', 'Notification System'],
    githubUrl: 'https://github.com/manishyadav1391/ParentAlertSystem',
    featured: false,
  },
  {
    title: 'Bid Scraper',
    description:
      'Automation bot that logs into the Bis portal, handles captcha and OTP authentication, scrapes bid data, and stores it in a database.',
    tags: ['Python', 'Selenium', 'Playwright', 'SQLite', 'Automation'],
    featured: true,
  },
]