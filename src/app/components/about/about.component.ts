import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private transloco: TranslocoService) {}

  // stats = [
  //   { number: '10+', label: 'about.stats.years' },
  //   { number: '1000+', label: 'about.stats.products' },
  //   { number: '50K+', label: 'about.stats.customers' },
  //   { number: '100%', label: 'about.stats.satisfaction' }
  // ];

  values = [
    {
      icon: 'heart',
      title: 'about.values.quality.title',
      description: 'about.values.quality.description'
    },
    {
      icon: 'safety-certificate',
      title: 'about.values.safety.title',
      description: 'about.values.safety.description'
    },
    {
      icon: 'star',
      title: 'about.values.excellence.title',
      description: 'about.values.excellence.description'
    },
    {
      icon: 'team',
      title: 'about.values.innovation.title',
      description: 'about.values.innovation.description'
    }
  ];

  team = [
    {
      name: 'about.team.member1.name',
      position: 'about.team.member1.position',
      image: 'assets/team-1.jpg',
      description: 'about.team.member1.description'
    },
    {
      name: 'about.team.member2.name',
      position: 'about.team.member2.position',
      image: 'assets/team-2.jpg',
      description: 'about.team.member2.description'
    },
    {
      name: 'about.team.member3.name',
      position: 'about.team.member3.position',
      image: 'assets/team-3.jpg',
      description: 'about.team.member3.description'
    }
  ];
}

