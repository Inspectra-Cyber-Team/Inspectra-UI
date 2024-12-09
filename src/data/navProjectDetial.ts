export const navProjectDetial = [
    {
      name: "Overview",
      link: (projectName: string) => `/project/${projectName}`,
    },
    {
      name: "Issue",
      link: (projectName: string) => `/project/${projectName}/issue`,
    },
    {
      name: "Rules",
      link: (projectName: string) => `/project/${projectName}/rules`,
    },
    {
      name: "Security Hotspot",
      link: (projectName: string) => `/project/${projectName}/security-hotspot`,
    },
  ];