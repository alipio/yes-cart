import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';

export interface ITreeNode {
  id: string;
  name: string;
  children: Array<ITreeNode>;
  expanded: boolean;
  selected: boolean;
}

@Component({
  selector: 'tree-view',
  moduleId: module.id,
  templateUrl: './tree_view.html',
  styleUrls: ['./tree_view.css'],
  directives: [TreeComponent]
})

export class TreeComponent implements OnInit {

  @Input() Nodes: Array<ITreeNode>;
  @Input() SelectedNode: ITreeNode;

  @Output() onSelectedChanged: EventEmitter<ITreeNode> = new EventEmitter();
  @Output() onRequestNodes: EventEmitter<ITreeNode> = new EventEmitter();

  constructor() {
    console.debug('TreeComponent  constructed');
  }

  ngOnInit() {
    console.debug('TreeComponent ngOnInit changed=' + JSON.stringify(this.Nodes));
  }

  onSelectNode(node: ITreeNode) {
    this.onSelectedChanged.emit(node);
  }

  onExpand(node: ITreeNode) {

    node.expanded = !node.expanded;

    if (node.expanded && node.children.length === 0) {
      this.onRequestNodes.emit(node);
    }
  }
}
