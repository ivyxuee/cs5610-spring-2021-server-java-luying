package com.example.wbdvsp2102luyingserverjava.controllers;

import com.example.wbdvsp2102luyingserverjava.models.Widget;
import com.example.wbdvsp2102luyingserverjava.services.WidgetService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {

  @Autowired
  WidgetService service;

  @PostMapping("/api/topics/{tid}/widgets")
  public Widget createWidgetForTopic(
      @PathVariable("tid") String topicId,
      @RequestBody Widget widget
  ) {
    return service.createWidgetForTopic(topicId, widget);
  }

  @GetMapping("/api/widgets")
  public List<Widget> findAllWidgets() {
    return service.findAllWidgets();
  }

  @GetMapping("/api/topics/{tid}/widgets")
  public List<Widget> findWidgetsForTopic(
      @PathVariable("tid") String topicId
  ) {
    return service.findWidgetsForTopic(topicId);
  }

  @DeleteMapping("/api/widgets/{wid}")
  public Integer deleteWidget(
      @PathVariable("wid") String id
  ) {
    return service.deleteWidget(id);
  }

  @PutMapping("/api/widgets/{wid}")
  public Integer updateWidget(
      @PathVariable("wid") String id,
      @RequestBody Widget widget
  ) {
    return service.updateWidget(id, widget);
  }
}