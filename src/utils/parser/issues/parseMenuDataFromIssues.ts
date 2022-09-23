import type { Menu } from "@models/application";
import type { Issue, Milestone } from "@models/github";
import { isNull, isUndefined } from "lodash";

/**
 * 解析所有的issues，从中组织成目录
 * 父目录:     Milestone1          Milestone2       Milestone3      无Milestone的散落issues
 * 子目录:    issue1,issue2     issue3, issue4    issue5, issue6 
 * @param issues 
 * @returns 
 */
export const parseMenuDataFromIssues = (issues: Issue[]): Menu[] => {

    const milestoneIdToMilestone = new Map<number, Milestone>();
    const milestoneToIssuesMap = new Map<Milestone, Issue[]>();

    const noneMilestoneIssues: Issue[] = [];
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
        const issues = milestoneToIssuesMap.get(milestone) || [];
        issues.push(issue);
        milestoneToIssuesMap.set(milestone, issues);
    })

    // TODO: 根据issues在milestone中的顺序进行排列
   return Array.from(milestoneToIssuesMap).sort((kv1, kv2) => kv1[0].id - kv2[0].id).map(([milestone, issues]) => {
        return {
            name: milestone.title,
            subMenus: issues.sort((issue1, issue2) => issue1.id - issue2.id).map(issue => ({name: issue.title}))
        } as Menu
    }).concat(noneMilestoneIssues.sort((i1, i2) => i1.id - i2.id).map(issue => ({name: issue.title})))
}