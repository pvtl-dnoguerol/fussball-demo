package com.pivotal.demo.FussballService.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Match {
    @Id
    private Long id;
    public Date date;
    @Column(name = "home_team_id")
    public Long homeTeamId;
    @Column(name = "away_team_id")
    public Long awayTeamId;
    @Column(name = "home_score")
    public Integer homeScore;
    @Column(name = "away_score")
    public Integer awayScore;
    @OneToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="location_id")
    public Location location;
    public Boolean friendly;
}
