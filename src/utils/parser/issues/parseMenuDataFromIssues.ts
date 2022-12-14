import type { Menu } from "@models/application";
import type { ListIssues } from "@models/github";
import { isRateLimit } from "@utils/application/isRateLimit";

/**
 * 解析所有的issues，从中组织成目录
 * 父目录:     Milestone1          Milestone2       Milestone3      无Milestone的散落issues
 * 子目录:    issue1,issue2     issue3, issue4    issue5, issue6 
 * @param issues 
 * @returns 
 */
export const parseMenuDataFromIssues = (issues: ListIssues): Menu[] => {
    const milestoneIdToMilestone = new Map<number, ListIssues[0]['milestone']>();
    const milestoneToIssuesMap = new Map<ListIssues[0]['milestone'], ListIssues>();

    const noneMilestoneIssues: ListIssues = [];
    issues?.forEach(issue => {
        if(!issue.milestone) {
            noneMilestoneIssues.push(issue);
            return;
        }

        const issueMilestoneId = issue.milestone!.id
        if(!milestoneIdToMilestone.has(issueMilestoneId) ) {
            milestoneIdToMilestone.set(issueMilestoneId, {...issue.milestone})
        }
        const milestone = milestoneIdToMilestone.get(issueMilestoneId)!;
        const milestoneIssues = milestoneToIssuesMap.get(milestone) || [];
        milestoneIssues.push(issue);
        milestoneToIssuesMap.set(milestone, milestoneIssues);
    })

    // TODO: 根据issues在milestone中的顺序进行排列
   return Array.from(milestoneToIssuesMap).sort((kv1, kv2) => kv1[0]!.id - kv2[0]!.id).map(([milestone, issues]) => {
        return {
            name: milestone!.title,
            subMenus: issues.sort((issue1, issue2) => issue1.id - issue2.id).map(issue => ({name: issue.title, id: issue.number}))
        } as Menu
    }).concat(noneMilestoneIssues.sort((i1, i2) => i1.id - i2.id).map(issue => ({name: issue.title, id: issue.number})))
}