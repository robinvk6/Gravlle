package org.icanj.app.tithing.reporting;

import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.JSPAlert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/Admin/Finance")
public class FinanceReportingController {

	@Autowired
	private FinancialReportingService reportingService;

	@RequestMapping(value = "/Annual")
	public ModelAndView annualConsolidatedReport(HttpServletRequest request) {
		ModelMap modelMap = new ModelMap();
		String year = request.getParameter("year");
		if(year == null || "".equals(year) || "Current".equals(year)){
			Calendar cal=Calendar.getInstance();
			  year=String.valueOf(cal.get(Calendar.YEAR));
		}

		try {
		List<AggregateReport> reports = reportingService.yearAggregateReport(Integer.valueOf(year));
		modelMap.addAttribute("reports", reports);
		} catch (Exception e) {
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, "There was an error processing your request." + e.getMessage()));
		}
		modelMap.addAttribute("year", year);
		modelMap.addAttribute("navSelected", "AnnualSummaryReport");
		return new ModelAndView("Tithe/AnnualReport", modelMap);
	}
}
