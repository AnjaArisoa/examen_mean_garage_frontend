import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-planing-mecanicien',
  imports: [CommonModule],
  templateUrl: './planing-mecanicien.component.html',
  styleUrl: './planing-mecanicien.component.scss'
})
export class PlaningMecanicienComponent {
    todo = ['Créer le design', 'Développer le frontend', 'Configurer la base de données'];
    inProgress = ['Créer les API', 'Tester les composants'];
    done = ['Déployer sur le serveur'];

    draggedTask: string | null = null;

    // Permet le drop en empêchant le comportement par défaut
    allowDrop(event: DragEvent) {
      event.preventDefault();
    }

    // Stocke la tâche qu'on est en train de déplacer
    drag(event: DragEvent, task: string) {
      this.draggedTask = task;
    }

    // Gère le drop de la tâche dans la nouvelle liste
    drop(event: DragEvent, targetList: 'todo' | 'inProgress' | 'done') {
      event.preventDefault();
      if (this.draggedTask) {
        // Retire la tâche de l'ancienne liste
        this.todo = this.todo.filter(task => task !== this.draggedTask);
        this.inProgress = this.inProgress.filter(task => task !== this.draggedTask);
        this.done = this.done.filter(task => task !== this.draggedTask);

        // Ajoute la tâche à la nouvelle liste
        this[targetList].push(this.draggedTask);
        this.draggedTask = null;
      }
    }
}
